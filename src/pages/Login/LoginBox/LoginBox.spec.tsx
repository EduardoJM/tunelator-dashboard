import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from '../../../contexts/loading';
import { AuthProvider, useAuth } from '../../../contexts/auth';
import LoginBox from './LoginBox';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const Wrapper: FC = ({ children }) => (
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
    render(<LoginBox />, { wrapper: Wrapper });

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
    render(<LoginBox />, { wrapper: Wrapper });

    const rememberField = screen.getByTestId('remember-field');
    const input = rememberField.querySelector('input');

    expect(input).toBeChecked();
  });

  it('should contain an link to signup', () => {
    render(<LoginBox />, { wrapper: Wrapper });

    expect(screen.queryByText(/^Criar minha conta$/i)).toBeInTheDocument();
  });

  it('should click on the link to signup move to the signup page', async () => {
    render(<LoginBox />, { wrapper: Wrapper });

    const link = screen.getByText(/^Criar minha conta$/i);

    window.history.replaceState({}, '', '/any-route');
    expect(window.location.pathname).toEqual('/any-route');

    await act(async () => {
      await userEvent.click(link);
    });

    expect(window.location.pathname).toEqual('/signup');
  });

  it('click on the link to login must call the useAuth login method and made the login', async () => {
    window.localStorage.clear();
    window.sessionStorage.clear();

    render(<LoginBox />, { wrapper: Wrapper });

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
});
