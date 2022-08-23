import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queryClient } from '@/__mocks__/queryClient';
import { mockOnce } from '@/__mocks__/server';
import { waitAbsoluteLoader, waitForAlertInScreen } from '@/utils/tests';
import App from '@/App';

describe('Login', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.history.replaceState({}, '', '/auth');
  });

  it('should render an login box with form and fields', async () => {
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    await waitFor(() => {
      expect(screen.queryByTestId('login-box')).toBeInTheDocument();
    });

    const form = screen.queryByRole('form');
    const email = screen.queryByTestId('email-field');
    const password = screen.queryByTestId('password-field');
    const remember = screen.queryByTestId('remember-field');
    const button = screen.queryByTestId<HTMLButtonElement>('submit-button');

    expect(form).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(remember).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button?.type.toLowerCase()).toEqual('submit');
  });

  it('should remember checkbox initial state is checked', async () => {
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const rememberField = screen.getByTestId('remember-field');
    const input = rememberField.querySelector('input');

    expect(input).toBeChecked();
  });

  it('should contain an link to signup', async () => {
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    expect(screen.queryByTestId('signup-link')).toBeInTheDocument();
  });

  it('should click on the link to signup move to the signup page', async () => {
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const link = screen.getByTestId('signup-link');

    await act(async () => {
      await userEvent.click(link);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('login-box')).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByTestId('signup-box')).toBeInTheDocument();
    });

    expect(window.location.pathname).toEqual('/signup');
  });

  it('should call useAuth login method and made the login when fill the data and click on the login button', async () => {
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

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

  it('should call the useAuth login method and made the login without remember when fill the data and click on the login button', async () => {
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

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

  it('should display an error toast when click on the button to login and got an validation error for email', async () => {
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const emailField = screen.getByTestId('email-field');
    const passwordField = screen.getByTestId('password-field');
    const button = screen.getByTestId('submit-button');

    await act(async () => {
      await userEvent.type(emailField, 'email');
      await userEvent.type(passwordField, 'password');

      await userEvent.click(button);
    });

    const { description } = await waitForAlertInScreen();
    expect(description).toEqual('errors.wrongemail');
  });

  it('should display an error toast when click on the button to login and got an validation error for password', async () => {
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

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

  it('should display an error toast with detail response when got an error from the API', async () => {
    mockOnce('post', '/auth/token/', 401, {
      detail: 'custom login error message',
    });

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const emailField = screen.getByTestId('email-field');
    const passwordField = screen.getByTestId('password-field');
    const button = screen.getByTestId('submit-button');

    await act(async () => {
      await userEvent.type(emailField, 'email@example.com');
      await userEvent.type(passwordField, 'password');

      await userEvent.click(button);
    });

    const { description } = await waitForAlertInScreen();
    expect(description).toEqual('custom login error message');
  });

  it('should have an recovery link in the login page', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const recoveryLink = screen.queryByTestId('recovery-link');
    expect(recoveryLink).toBeInTheDocument();
  });

  it('should redirect to the recovery page when click into recovery link', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const recoveryLink = screen.getByTestId('recovery-link');

    await act(async () => {
      await userEvent.click(recoveryLink);
    });

    expect(window.location.pathname).toEqual('/recovery');
  });
});
