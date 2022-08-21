import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queryClient } from '@/__mocks__/queryClient';
import { waitAbsoluteLoader, waitForAlertInScreen } from '@/utils/tests';
import userFactory from '@/__mocks__/factories/user';
import { mockOnce, mockOnceWithDelay } from '@/__mocks__/server';
import App from '@/App';

describe('Customer.Profile', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/customer/profile');
  });

  it('should redirect to /auth page if user is not authenticated', async () => {
    window.sessionStorage.clear();

    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    expect(window.location.pathname).toEqual('/auth');
    expect(screen.queryByTestId('login-box')).toBeInTheDocument();
  });

  it('should contains the complete name as first header when the user has first and last name', async () => {
    const user = userFactory();
    mockOnce('get', '/auth/user/', 200, user);

    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();
    await waitFor(() => {
      const skeleton = screen.queryByTestId('profile-form-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });

    const heading = screen.queryByText(`${user.first_name} ${user.last_name}`);
    expect(heading).toBeInTheDocument();
    expect(heading?.tagName.toUpperCase()).toEqual('H1');
  });

  it('should contains the first name as first header if the user has first name and not have last name', async () => {
    const user = userFactory({ last_name: '' });
    mockOnce('get', '/auth/user/', 200, user);

    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();
    await waitFor(() => {
      const skeleton = screen.queryByTestId('profile-form-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });

    const heading = screen.queryByText(`${user.first_name}`);
    expect(heading).toBeInTheDocument();
    expect(heading?.tagName.toUpperCase()).toEqual('H1');
  });

  it('should contains the e-mail as first header if the user has no first no last name', async () => {
    const user = userFactory({ first_name: '', last_name: '' });
    mockOnce('get', '/auth/user/', 200, user);

    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();
    await waitFor(() => {
      const skeleton = screen.queryByTestId('profile-form-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });

    const heading = screen.queryByText(`${user.email}`);
    expect(heading).toBeInTheDocument();
    expect(heading?.tagName.toUpperCase()).toEqual('H1');
  });

  it('should shows an skeleton while the user data is retrieved', async () => {
    const user = userFactory({ first_name: '', last_name: '' });
    mockOnceWithDelay('get', '/auth/user/', 200, user, 500);

    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    let skeleton = screen.queryByTestId('profile-form-skeleton');
    expect(skeleton).toBeInTheDocument();

    await waitFor(() => {
      skeleton = screen.queryByTestId('profile-form-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });
  });

  it('should contains an form for first_name and last_name with a submit button', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();
    await waitFor(() => {
      const skeleton = screen.queryByTestId('profile-form-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });

    expect(screen.queryByRole('form')).toBeInTheDocument();
    expect(screen.queryByTestId('first-name-field')).toBeInTheDocument();
    expect(screen.queryByTestId('last-name-field')).toBeInTheDocument();
    expect(screen.queryByTestId('submit-button')).toBeInTheDocument();
  });

  it('should the initial values of the first_name and the last_name must be get from the api', async () => {
    const user = userFactory();
    mockOnce('get', '/auth/user/', 200, user);

    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();
    await waitFor(() => {
      const skeleton = screen.queryByTestId('profile-form-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });

    expect(screen.queryByTestId('first-name-field')).toHaveValue(
      user.first_name
    );
    expect(screen.queryByTestId('last-name-field')).toHaveValue(user.last_name);
  });

  it('should save the user data to the api when click on the submit button', async () => {
    const user = userFactory();
    const apiCallback = mockOnce('patch', '/auth/user/', 200, user);

    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();
    await waitFor(() => {
      const skeleton = screen.queryByTestId('profile-form-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });

    const first_name = screen.getByTestId('first-name-field');
    const last_name = screen.getByTestId('first-name-field');
    const button = screen.getByTestId('submit-button');

    await act(async () => {
      await userEvent.clear(first_name);
      await userEvent.type(first_name, 'My');
      await userEvent.clear(last_name);
      await userEvent.type(last_name, 'Name');

      await userEvent.click(button);
    });

    await waitAbsoluteLoader();

    await waitFor(() => {
      expect(apiCallback).toHaveBeenCalledTimes(1);
    });
  });

  it('should show error informations in a toast when api return error', async () => {
    mockOnce('patch', '/auth/user/', 400, { detail: 'custom error.' });

    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();
    await waitFor(() => {
      const skeleton = screen.queryByTestId('profile-form-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });

    const first_name = screen.getByTestId('first-name-field');
    const last_name = screen.getByTestId('first-name-field');
    const button = screen.getByTestId('submit-button');

    await act(async () => {
      await userEvent.clear(first_name);
      await userEvent.type(first_name, 'My');
      await userEvent.clear(last_name);
      await userEvent.type(last_name, 'Name');

      await userEvent.click(button);
    });

    const { description } = await waitForAlertInScreen();
    expect(description).toEqual('custom error.');

    await waitAbsoluteLoader();
  });

  it('should show error informations in a toast when gots validation error', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();
    await waitFor(() => {
      const skeleton = screen.queryByTestId('profile-form-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });

    const first_name = screen.getByTestId('first-name-field');
    const last_name = screen.getByTestId('last-name-field');
    const button = screen.getByTestId('submit-button');

    await act(async () => {
      await userEvent.clear(first_name);
      await userEvent.type(last_name, 'Name');

      await userEvent.click(button);
    });

    const { description } = await waitForAlertInScreen();

    expect(description).toEqual('errors.wrongname');

    await waitAbsoluteLoader();
  });

  it('should shows an error boundary if the api gots an error', async () => {
    mockOnce('get', '/auth/user/', 400, {});

    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    await waitFor(() => {
      const skeleton = screen.queryByTestId('profile-form-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });

    await waitFor(() => {
      const boundary = screen.queryByTestId('profile-boundary');
      expect(boundary).toBeInTheDocument();
    });
  });
});
