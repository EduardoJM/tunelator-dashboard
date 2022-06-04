import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { rest } from 'msw';
import { QueryClient, QueryClientProvider } from 'react-query';
import { server } from '../../mocks/server';
import { LoadingProvider } from '../../contexts/loading';
import config from '../../config';
import RecoveryReset from './RecoveryReset';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

const wrapper: FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <LoadingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/:id" element={<>{children}</>} />
        </Routes>
      </BrowserRouter>
    </LoadingProvider>
  </QueryClientProvider>
);

describe('RecoveryReset', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/my-id');
  });

  it('if the api resolves that id is not valid, then render a error message', async () => {
    server.use(
      rest.get(`${config.apiUrl}/auth/recovery/:id/`, (req, res, ctx) => {
        return res.once(ctx.status(404));
      })
    );

    render(<RecoveryReset />, { wrapper });

    await waitFor(() => {
      expect(
        screen.queryByTestId('absolute-loading-overlay')
      ).not.toBeInTheDocument();
    });

    expect(screen.queryByText(/^Esse link expirou...$/i)).toBeInTheDocument();
    expect(screen.queryByText(/Recuperar Senha/i)).toBeInTheDocument();

    const button = screen.getByText(/Recuperar Senha/i);
    expect(button.tagName.toUpperCase()).toEqual('BUTTON');
  });

  it('click in the recovery password button must redirect to the page to get an new e-mail', async () => {
    server.use(
      rest.get(`${config.apiUrl}/auth/recovery/:id/`, (req, res, ctx) => {
        return res.once(ctx.status(404));
      })
    );
    expect(location.pathname).toEqual('/my-id');

    render(<RecoveryReset />, { wrapper });

    await waitFor(() => {
      expect(
        screen.queryByTestId('absolute-loading-overlay')
      ).not.toBeInTheDocument();
    });

    const button = screen.getByText(/Recuperar Senha/i);

    await act(async () => {
      await userEvent.click(button);
    });

    expect(location.pathname).toEqual('/recovery');

    await waitFor(() => {
      expect(
        screen.queryByTestId('absolute-loading-overlay')
      ).not.toBeInTheDocument();
    });
  });

  it('should not render the error messages if the api validate the session', async () => {
    render(<RecoveryReset />, { wrapper });

    await waitFor(() => {
      expect(
        screen.queryByTestId('absolute-loading-overlay')
      ).not.toBeInTheDocument();
    });

    expect(
      screen.queryByText(/^Esse link expirou...$/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Recuperar Senha/i)).not.toBeInTheDocument();
  });

  it('should render a form and two password fields if the api validates the session', async () => {
    render(<RecoveryReset />, { wrapper });

    await waitFor(() => {
      expect(
        screen.queryByTestId('absolute-loading-overlay')
      ).not.toBeInTheDocument();
    });

    expect(screen.queryByRole('form')).toBeInTheDocument();
    expect(screen.queryByTestId('password1-field')).toBeInTheDocument();
    expect(screen.queryByTestId('password2-field')).toBeInTheDocument();
    expect(screen.queryByTestId('submit-button')).toBeInTheDocument();
  });

  it('should call the api, show an success message and redirect to home path when changes are made', async () => {
    const apiCallback = jest.fn();
    server.use(
      rest.put(`${config.apiUrl}/auth/recovery/:id/`, (req, res, ctx) => {
        apiCallback();
        return res.once(ctx.status(200));
      })
    );

    render(<RecoveryReset />, { wrapper });

    await waitFor(() => {
      expect(
        screen.queryByTestId('absolute-loading-overlay')
      ).not.toBeInTheDocument();
    });

    const password1 = screen.getByTestId('password1-field');
    const password2 = screen.getByTestId('password2-field');
    const submit = screen.getByTestId('submit-button');

    await act(async () => {
      await userEvent.type(password1, 'password1');
      await userEvent.type(password2, 'password2');

      await userEvent.click(submit);
    });

    await waitFor(() => {
      expect(apiCallback).toHaveBeenCalledTimes(1);
      expect(
        screen.queryByTestId('absolute-loading-overlay')
      ).not.toBeInTheDocument();
      expect(screen.queryAllByRole('alert').length).toBeGreaterThan(0);
    });

    expect(
      screen.queryAllByText(
        /Senha alterada com sucesso! Faça login para continuar.../i
      ).length
    ).toBeGreaterThan(0);
    expect(location.pathname).toEqual('/');
  });
});
