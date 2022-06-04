import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { rest } from 'msw';
import { server } from '../../mocks/server';
import { LoadingProvider } from '../../contexts/loading';
import config from '../../config';
import RecoveryReset from './RecoveryReset';

const wrapper: FC = ({ children }) => (
  <LoadingProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<>{children}</>} />
      </Routes>
    </BrowserRouter>
  </LoadingProvider>
);

describe('RecoveryReset', () => {
  it('if the api resolves that id is not valid, then render a error message', async () => {
    server.use(
      rest.get(`${config.apiUrl}/auth/recovery/:id/`, (req, res, ctx) => {
        return res.once(ctx.status(404));
      })
    );
    window.history.replaceState({}, '', '/my-id');

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
    window.history.replaceState({}, '', '/my-id');
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
  });
});
