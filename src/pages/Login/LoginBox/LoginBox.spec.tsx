import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { LoadingProvider } from '../../../contexts/loading';
import { AuthProvider } from '../../../contexts/auth';
import LoginBox from './LoginBox';
import { server } from '../../../mocks/server';
import config from '../../../config';
import { waitForAlertInScreen } from '@/test/utils/alerts';

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
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </LoadingProvider>
  </QueryClientProvider>
);

describe('Login', () => {
  it('should contain an form and e-mail, password and remember inputs and an submit', () => {
    render(<LoginBox />, { wrapper });

    const form = screen.queryByRole('form');
    const emailField = screen.queryByTestId('email-field');
    const passwordField = screen.queryByTestId('password-field');
    const rememberField = screen.queryByTestId('remember-field');
    const button = screen.queryByTestId<HTMLButtonElement>('submit-button');

    expect(form).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(rememberField).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button?.type.toLowerCase()).toEqual('submit');
  });

  it('should remember checkbox initial state is checked', () => {
    render(<LoginBox />, { wrapper });

    const rememberField = screen.getByTestId('remember-field');
    const input = rememberField.querySelector('input');

    expect(input).toBeChecked();
  });

  it('should contain an link to signup', () => {
    render(<LoginBox />, { wrapper });

    expect(screen.queryByText(/^Criar minha conta$/i)).toBeInTheDocument();
  });

  it('should click on the link to signup move to the signup page', async () => {
    render(<LoginBox />, { wrapper });

    const link = screen.getByText(/^Criar minha conta$/i);

    window.history.replaceState({}, '', '/any-route');
    expect(window.location.pathname).toEqual('/any-route');

    await act(async () => {
      await userEvent.click(link);
    });

    expect(window.location.pathname).toEqual('/signup');
  });

  it('click on the button to login must call the useAuth login method and made the login', async () => {
    window.localStorage.clear();
    window.sessionStorage.clear();

    render(<LoginBox />, { wrapper });

    window.history.replaceState({}, '', '/any-route');
    expect(window.location.pathname).toEqual('/any-route');

    const emailField = screen.getByTestId('email-field');
    const passwordField = screen.getByTestId('password-field');
    const button = screen.getByTestId('submit-button');

    await act(async () => {
      await userEvent.type(emailField, 'email@example.com');
      await userEvent.type(passwordField, 'password');

      await userEvent.click(button);
    });

    await waitFor(() => {
      expect(window.location.pathname).toEqual('/');
      expect(localStorage.getItem('@TUNELATOR_REFRESH')).not.toBeNull();
    });
  });

  it('click on the button to login must call the useAuth login method and made the login without remember', async () => {
    window.localStorage.clear();
    window.sessionStorage.clear();

    render(<LoginBox />, { wrapper });

    window.history.replaceState({}, '', '/any-route');
    expect(window.location.pathname).toEqual('/any-route');

    const emailField = screen.getByTestId('email-field');
    const passwordField = screen.getByTestId('password-field');
    const button = screen.getByTestId('submit-button');
    const rememberField = screen.getByTestId('remember-field');

    await act(async () => {
      await userEvent.click(rememberField);
    });

    await act(async () => {
      await userEvent.type(emailField, 'email@example.com');
      await userEvent.type(passwordField, 'password');

      await userEvent.click(button);
    });

    await waitFor(() => {
      expect(window.location.pathname).toEqual('/');
      expect(sessionStorage.getItem('@TUNELATOR_REFRESH')).not.toBeNull();
    });
  });

  it('click on the button to login and got an validation error for e-mail must show the error as toast', async () => {
    render(<LoginBox />, { wrapper });

    const emailField = screen.getByTestId('email-field');
    const passwordField = screen.getByTestId('password-field');
    const button = screen.getByTestId('submit-button');

    await act(async () => {
      await userEvent.type(emailField, 'email');
      await userEvent.type(passwordField, 'password');

      await userEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument();
    });

    const { description } = await waitForAlertInScreen();

    expect(description).toEqual('errors.wrongemail');
  });

  it('click on the button to login and got an validation error for password must show the error as toast', async () => {
    render(<LoginBox />, { wrapper });

    const emailField = screen.getByTestId('email-field');
    const passwordField = screen.getByTestId('password-field');
    const button = screen.getByTestId('submit-button');

    await act(async () => {
      await userEvent.type(emailField, 'email@example.com');

      await userEvent.click(button);
    });

    const { description } = await waitForAlertInScreen();

    expect(description).toEqual('errors.wrongpassword');
  });

  it('click on the button to login and got an error must show the error as toast', async () => {
    window.localStorage.clear();
    window.sessionStorage.clear();

    server.use(
      rest.post(`${config.apiUrl}/auth/token/`, (req, res, ctx) => {
        return res.once(
          ctx.status(401),
          ctx.json({
            detail: 'custom login error message',
          })
        );
      })
    );

    render(<LoginBox />, { wrapper });

    const emailField = screen.getByTestId('email-field');
    const passwordField = screen.getByTestId('password-field');
    const button = screen.getByTestId('submit-button');

    await act(async () => {
      await userEvent.type(emailField, 'email@example.com');
      await userEvent.type(passwordField, 'password');

      await userEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument();
    });

    expect(
      screen.queryByText(/^custom login error message$/i)
    ).toBeInTheDocument();
  });
});
