import { FC } from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { rest } from 'msw';
import RecoveryPassword from './RecoveryPassword';
import { LoadingProvider } from '../../contexts/loading';
import { server } from '../../mocks/server';
import config from '../../config';

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
      <BrowserRouter>{children}</BrowserRouter>
    </LoadingProvider>
  </QueryClientProvider>
);

describe('RecoveryPassword', () => {
  it('should contains an form, an e-mail input and a submit button', () => {
    render(<RecoveryPassword />, { wrapper });

    expect(screen.queryByRole('form')).toBeInTheDocument();
    expect(screen.queryByTestId('email-field')).toBeInTheDocument();
    expect(screen.queryByTestId('submit-button')).toBeInTheDocument();
  });

  it('type the e-mail and click on the send button must call the api and show an alert in the screen', async () => {
    const apiCallback = jest.fn();
    server.use(
      rest.post(`${config.apiUrl}/auth/recovery/`, (req, res, ctx) => {
        apiCallback();
        return res(ctx.status(200));
      })
    );

    render(<RecoveryPassword />, { wrapper });

    const email = screen.getByTestId('email-field');
    const button = screen.getByTestId('submit-button');

    await act(async () => {
      await userEvent.type(email, 'example@example.com');
      await userEvent.click(button);
    });

    await waitFor(() => {
      expect(apiCallback).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('alert')).toBeInTheDocument();
    });

    expect(
      screen.queryByText(/Se o e-mail estiver associado/i)
    ).toBeInTheDocument();
  });
});