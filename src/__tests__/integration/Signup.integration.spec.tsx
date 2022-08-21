import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queryClient } from '@/__mocks__/queryClient';
import { mockOnce } from '@/__mocks__/server';
import { waitAbsoluteLoader, waitForAlertInScreen } from '@/utils/tests';
import App from '@/App';

describe('Signup', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.history.replaceState({}, '', '/signup');
  });

  it('should contain an form the fields', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    expect(screen.queryByRole('form')).toBeInTheDocument();
    expect(screen.queryByTestId('email-field')).toBeInTheDocument();
    expect(screen.queryByTestId('first-name-field')).toBeInTheDocument();
    expect(screen.queryByTestId('last-name-field')).toBeInTheDocument();
    expect(screen.queryByTestId('password-field')).toBeInTheDocument();
    expect(screen.queryByTestId('terms-field')).toBeInTheDocument();
    expect(screen.queryByTestId('remember-field')).toBeInTheDocument();

    const button = screen.queryByTestId<HTMLButtonElement>('submit-button');
    expect(button).toBeInTheDocument();
    expect(button?.tagName.toUpperCase()).toEqual('BUTTON');
  });

  it('should remember checkbox initial state is checked', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const rememberField = screen.getByTestId('remember-field');
    const input = rememberField.querySelector('input');

    expect(input).toBeChecked();
  });

  it('should accept terms checkbox initial state is unchecked', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const termsField = screen.getByTestId('terms-field');
    const input = termsField.querySelector('input');

    expect(input).not.toBeChecked();
  });

  it('should click on the accept terms checkbox must open the accept terms modal and click on the cancel do not change the checkbox', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const termsField = screen.getByTestId('terms-field');
    const input = termsField.querySelector('input');

    expect(input).not.toBeChecked();

    await act(async () => {
      await userEvent.click(termsField);
    });

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).toBeInTheDocument();
    });

    const modal = screen.getByRole('alertdialog');
    const cancelButton = modal.querySelectorAll(
      '[data-testid="cancel-button"]'
    )[0];

    await act(async () => {
      await userEvent.click(cancelButton);
    });

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });

    expect(input).not.toBeChecked();
  });

  it('should click on the accept terms checkbox must open the accept terms modal and click on the confirm do change the checkbox', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const termsField = screen.getByTestId('terms-field');
    const input = termsField.querySelector('input');

    expect(input).not.toBeChecked();

    await act(async () => {
      await userEvent.click(termsField);
    });

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).toBeInTheDocument();
    });

    const modal = screen.getByRole('alertdialog');
    const confirmButton = modal.querySelectorAll(
      '[data-testid="confirm-button"]'
    )[0];

    await act(async () => {
      await userEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });

    expect(input).toBeChecked();
  });

  it('should click on the accept terms checkbox must open the accept terms modal and click on the confirm do change the checkbox and click on the checkbox uncheck it', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const termsField = screen.getByTestId('terms-field');
    const input = termsField.querySelector('input');

    expect(input).not.toBeChecked();

    await act(async () => {
      await userEvent.click(termsField);
    });

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).toBeInTheDocument();
    });

    const modal = screen.getByRole('alertdialog');
    const confirmButton = modal.querySelectorAll(
      '[data-testid="confirm-button"]'
    )[0];

    await act(async () => {
      await userEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });

    expect(input).toBeChecked();

    await act(async () => {
      await userEvent.click(termsField);
    });

    expect(input).not.toBeChecked();
  });

  it('should contain an link to Login', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    expect(screen.queryByTestId('login-link')).toBeInTheDocument();
  });

  it('should click on the link to login move to the login page', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const link = screen.getByTestId('login-link');
    await act(async () => {
      await userEvent.click(link);
    });

    expect(window.location.pathname).toEqual('/auth');
    expect(screen.queryByTestId('login-box')).toBeInTheDocument();
    expect(screen.queryByTestId('signup-box')).not.toBeInTheDocument();
  });

  it('should click on the signup button must create the account and made the login', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const emailField = screen.getByTestId('email-field');
    const firstNameField = screen.getByTestId('first-name-field');
    const lastNameField = screen.getByTestId('last-name-field');
    const passwordField = screen.getByTestId('password-field');
    const termsField = screen.getByTestId('terms-field');
    const button = screen.getByTestId('submit-button');

    // check confirm terms
    await act(async () => {
      await userEvent.click(termsField);
    });
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).toBeInTheDocument();
    });
    const modal = screen.getByRole('alertdialog');
    const confirmButton = modal.querySelectorAll(
      '[data-testid="confirm-button"]'
    )[0];
    await act(async () => {
      await userEvent.click(confirmButton);
    });
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });

    // type fields
    await act(async () => {
      await userEvent.type(firstNameField, 'example');
      await userEvent.type(lastNameField, 'example');
      await userEvent.type(emailField, 'email@example.com');
      await userEvent.type(passwordField, 'password');

      await userEvent.click(button);
    });

    await waitAbsoluteLoader();

    await waitFor(() => {
      expect(window.location.pathname).toEqual('/');
      expect(localStorage.getItem('@TUNELATOR_REFRESH')).not.toBeNull();
    });
  });

  it('should click on the signup button must create the account and made the login without remember', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const emailField = screen.getByTestId('email-field');
    const firstNameField = screen.getByTestId('first-name-field');
    const lastNameField = screen.getByTestId('last-name-field');
    const passwordField = screen.getByTestId('password-field');
    const termsField = screen.getByTestId('terms-field');
    const button = screen.getByTestId('submit-button');
    const rememberField = screen.getByTestId('remember-field');

    await act(async () => {
      await userEvent.click(rememberField);
    });

    // check confirm terms
    await act(async () => {
      await userEvent.click(termsField);
    });
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).toBeInTheDocument();
    });
    const modal = screen.getByRole('alertdialog');
    const confirmButton = modal.querySelectorAll(
      '[data-testid="confirm-button"]'
    )[0];
    await act(async () => {
      await userEvent.click(confirmButton);
    });
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });

    // type fields
    await act(async () => {
      await userEvent.type(firstNameField, 'example');
      await userEvent.type(lastNameField, 'example');
      await userEvent.type(emailField, 'email@example.com');
      await userEvent.type(passwordField, 'password');

      await userEvent.click(button);
    });

    await waitAbsoluteLoader();

    await waitFor(() => {
      expect(window.location.pathname).toEqual('/');
      expect(sessionStorage.getItem('@TUNELATOR_REFRESH')).not.toBeNull();
    });
  });

  it('should click on the signup button and got server error must show as toast', async () => {
    mockOnce('post', '/auth/create/', 400, {
      email: 'custom signup error message',
    });

    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const emailField = screen.getByTestId('email-field');
    const firstNameField = screen.getByTestId('first-name-field');
    const lastNameField = screen.getByTestId('last-name-field');
    const passwordField = screen.getByTestId('password-field');
    const termsField = screen.getByTestId('terms-field');
    const button = screen.getByTestId('submit-button');

    // check confirm terms
    await act(async () => {
      await userEvent.click(termsField);
    });
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).toBeInTheDocument();
    });
    const modal = screen.getByRole('alertdialog');
    const confirmButton = modal.querySelectorAll(
      '[data-testid="confirm-button"]'
    )[0];
    await act(async () => {
      await userEvent.click(confirmButton);
    });
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });

    // type fields
    await act(async () => {
      await userEvent.type(firstNameField, 'example');
      await userEvent.type(lastNameField, 'example');
      await userEvent.type(emailField, 'email@example.com');
      await userEvent.type(passwordField, 'password');

      await userEvent.click(button);
    });

    const { description } = await waitForAlertInScreen();
    expect(description).toEqual('custom signup error message');
  });

  it('should click on the signup button and got validation error must show as toast', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const emailField = screen.getByTestId('email-field');
    const firstNameField = screen.getByTestId('first-name-field');
    const lastNameField = screen.getByTestId('last-name-field');
    const passwordField = screen.getByTestId('password-field');
    const button = screen.getByTestId('submit-button');

    // type fields
    await act(async () => {
      await userEvent.type(firstNameField, 'example');
      await userEvent.type(lastNameField, 'example');
      await userEvent.type(emailField, 'email@example.com');
      await userEvent.type(passwordField, 'password');

      await userEvent.click(button);
    });

    const { description } = await waitForAlertInScreen();

    expect(description).toEqual('errors.wrongterms');
  });
});
