import {
  render,
  screen,
  waitForElementToBeRemoved,
  act,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queryClient } from '@/__mocks__/queryClient';
import { mockOnce } from '@/__mocks__/server';
import { waitAbsoluteLoader, waitForAlertInScreen } from '@/utils/tests';
import App from '@/App';

describe('RecoveryPassword', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.history.replaceState({}, '', '/recovery/my-id');
  });

  it('should render an error page if the api resolves that id is not valid', async () => {
    mockOnce('get', '/auth/recovery/:id/', 404, {});

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const expiredText = screen.queryByText(/^recoveryReset\.expired\.title$/i);
    const button = screen.queryByTestId('recovery-button');

    expect(expiredText).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button?.tagName.toUpperCase()).toEqual('BUTTON');
  });

  it('should redirect to the recovery e-mail page when click on the recovery password button in the error page', async () => {
    mockOnce('get', '/auth/recovery/:id/', 404, {});

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const button = screen.getByTestId('recovery-button');

    await act(async () => {
      await userEvent.click(button);
    });

    expect(location.pathname).toEqual('/recovery');
    expect(screen.queryByRole('form')).toBeInTheDocument();
    await waitAbsoluteLoader();
  });

  it('should not render the error messages if the api validate the session', async () => {
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const expiredText = screen.queryByText(/^recoveryReset\.expired\.title$/i);
    const button = screen.queryByTestId('recovery-button');

    expect(expiredText).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });

  it('should render a form and two password fields if the api validates the session', async () => {
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const form = screen.queryByRole('form');
    const passwordField = screen.queryByTestId('password1-field');
    const confirmPasswordField = screen.queryByTestId('password2-field');
    const submitButton = screen.queryByTestId('submit-button');

    expect(form).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(confirmPasswordField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should call the api, show an success message and redirect to home path when changes are made', async () => {
    const apiCallback = mockOnce('put', '/auth/recovery/:id/reset/', 200, {});
    const expectedDescription = 'alerts.reset.message';

    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const password1 = screen.getByTestId('password1-field');
    const password2 = screen.getByTestId('password2-field');
    const submit = screen.getByTestId('submit-button');

    await act(async () => {
      await userEvent.type(password1, 'password1');
      await userEvent.type(password2, 'password1');

      await userEvent.click(submit);
    });

    await waitAbsoluteLoader();
    await waitFor(() => {
      expect(apiCallback).toHaveBeenCalledTimes(1);
    });
    const { description } = await waitForAlertInScreen();

    expect(description).toEqual(expectedDescription);
    expect(location.pathname).toEqual('/auth');
  });

  it('should display an error and not call the api if the passwords is sent empty', async () => {
    const apiCallback = mockOnce('put', 'auth/recovery/:id/reset/', 200, {});

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const submit = screen.getByTestId('submit-button');

    await act(async () => {
      await userEvent.click(submit);
    });

    await waitAbsoluteLoader();
    const { description } = await waitForAlertInScreen();

    expect(description).toEqual('errors.wrongchangepassword');
    expect(apiCallback).toHaveBeenCalledTimes(0);
  });

  it('should display an error and not call the api if the passwords are different', async () => {
    const apiCallback = mockOnce('put', '/auth/recovery/:id/reset/', 200, {});

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const submit = screen.getByTestId('submit-button');

    const password1 = screen.getByTestId('password1-field');
    const password2 = screen.getByTestId('password2-field');
    await act(async () => {
      await userEvent.type(password1, 'password1');
      await userEvent.type(password2, 'password2');
      await userEvent.click(submit);
    });

    await waitAbsoluteLoader();
    const { description } = await waitForAlertInScreen();

    expect(description).toEqual('errors.wrongchangepassword');
    expect(apiCallback).toHaveBeenCalledTimes(0);
  });

  it('should display an error if the api gots an error', async () => {
    const body = {
      detail: 'My Any Error!',
    };
    const apiCallback = mockOnce('put', '/auth/recovery/:id/reset/', 400, body);

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const submit = screen.getByTestId('submit-button');

    const password1 = screen.getByTestId('password1-field');
    const password2 = screen.getByTestId('password2-field');
    await act(async () => {
      await userEvent.type(password1, 'password1');
      await userEvent.type(password2, 'password1');
      await userEvent.click(submit);
    });

    await waitAbsoluteLoader();
    const { description } = await waitForAlertInScreen();

    expect(description).toEqual(body.detail);
    expect(apiCallback).toHaveBeenCalledTimes(1);
  });
});
