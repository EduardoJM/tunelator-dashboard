import { FC } from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitForAlertInScreen } from '@/test/utils/alerts';
import { waitLoaders } from '@/test/utils/loaders';
import { AuthContextData, useAuth } from '@/contexts/auth';
import { mockOnce } from '@/mocks/server';
import { wrapper } from '@/mocks/contexts/wrapper';
import userFactory from '@/mocks/factories/user';
import Profile from './Profile';

describe('Profile', () => {
  it('should contains the complete name as first header when the user has first and last name', async () => {
    const user = userFactory();
    mockOnce('get', '/auth/user/', 200, user);

    render(<Profile />, { wrapper });

    await waitLoaders();

    const heading = screen.queryByText(`${user.first_name} ${user.last_name}`);
    expect(heading).toBeInTheDocument();
    expect(heading?.tagName.toUpperCase()).toEqual('H1');
  });

  it('should contains the first name as first header if the user has first name and not have last name', async () => {
    const user = userFactory({ last_name: '' });
    mockOnce('get', '/auth/user/', 200, user);

    render(<Profile />, { wrapper });

    await waitLoaders();

    const heading = screen.queryByText(`${user.first_name}`);
    expect(heading).toBeInTheDocument();
    expect(heading?.tagName.toUpperCase()).toEqual('H1');
  });

  it('should contains the e-mail as first header if the user has no first no last name', async () => {
    const user = userFactory({ first_name: '', last_name: '' });
    mockOnce('get', '/auth/user/', 200, user);

    render(<Profile />, { wrapper });

    await waitLoaders();

    const heading = screen.queryByText(`${user.email}`);
    expect(heading).toBeInTheDocument();
    expect(heading?.tagName.toUpperCase()).toEqual('H1');
  });

  it('should shows an loading indicator while the user data is retrieved', async () => {
    render(<Profile />, { wrapper });

    expect(screen.queryByTestId('loading-indicator')).toBeInTheDocument();

    await waitLoaders();
  });

  it('should contains an form for first_name and last_name with a submit button', async () => {
    render(<Profile />, { wrapper });

    await waitLoaders();

    expect(screen.queryByRole('form')).toBeInTheDocument();
    expect(screen.queryByTestId('first-name-field')).toBeInTheDocument();
    expect(screen.queryByTestId('last-name-field')).toBeInTheDocument();
    expect(screen.queryByTestId('submit-button')).toBeInTheDocument();
  });

  it('should the initial values of the first_name and the last_name must be get from the api', async () => {
    const user = userFactory();
    mockOnce('get', '/auth/user/', 200, user);

    render(<Profile />, { wrapper });

    await waitLoaders();

    expect(screen.queryByTestId('first-name-field')).toHaveValue(
      user.first_name
    );
    expect(screen.queryByTestId('last-name-field')).toHaveValue(user.last_name);
  });

  it('should save the user data to the api when click on the submit button', async () => {
    const user = userFactory();
    const apiCallback = mockOnce('patch', '/auth/user/', 200, user);

    render(<Profile />, { wrapper });

    await waitLoaders();

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

    await waitLoaders();

    await waitFor(() => {
      expect(apiCallback).toHaveBeenCalledTimes(1);
    });
  });

  it('should update the context data when save the user data to the api', async () => {
    const user = userFactory();
    mockOnce('patch', '/auth/user/', 200, user);

    let authState: AuthContextData;
    const MyComponent: FC = () => {
      authState = useAuth();

      return <Profile />;
    };

    render(<MyComponent />, { wrapper });

    await waitLoaders();

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

    await waitFor(() => {
      expect(authState.userData?.first_name).toEqual(user.first_name);
      expect(authState.userData?.last_name).toEqual(user.last_name);
    });

    await waitLoaders();
  });

  it('should show error informations in a toast when api return error', async () => {
    mockOnce('patch', '/auth/user/', 400, { detail: 'custom error.' });

    render(<Profile />, { wrapper });

    await waitLoaders();

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

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument();
    });

    expect(screen.queryByText(/^custom error\.$/i)).toBeInTheDocument();

    await waitLoaders();
  });

  it('should show error informations in a toast when gots validation error', async () => {
    render(<Profile />, { wrapper });

    await waitLoaders();

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

    await waitLoaders();
  });
});
