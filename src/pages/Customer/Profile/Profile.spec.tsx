import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { LoadingProvider } from '../../../contexts/loading';
import { AuthContextData, AuthProvider, useAuth } from '../../../contexts/auth';
import { server } from '../../../mocks/server';
import userFactory from '../../../mocks/factories/user';
import config from '../../../config';
import Profile from './Profile';

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

describe('Profile', () => {
  it('should contains the complete name as first header when the user has first and last name', async () => {
    const user = userFactory();
    server.use(
      rest.get(`${config.apiUrl}/auth/user/`, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json(user));
      })
    );

    render(<Profile />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    const heading = screen.queryByText(`${user.first_name} ${user.last_name}`);
    expect(heading).toBeInTheDocument();
    expect(heading?.tagName.toUpperCase()).toEqual('H1');
  });

  it('should contains the first name as first header if the user has first name and not have last name', async () => {
    const user = userFactory({ last_name: '' });
    server.use(
      rest.get(`${config.apiUrl}/auth/user/`, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json(user));
      })
    );

    render(<Profile />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    const heading = screen.queryByText(`${user.first_name}`);
    expect(heading).toBeInTheDocument();
    expect(heading?.tagName.toUpperCase()).toEqual('H1');
  });

  it('should contains the e-mail as first header if the user has no first no last name', async () => {
    const user = userFactory({ first_name: '', last_name: '' });
    server.use(
      rest.get(`${config.apiUrl}/auth/user/`, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json(user));
      })
    );

    render(<Profile />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    const heading = screen.queryByText(`${user.email}`);
    expect(heading).toBeInTheDocument();
    expect(heading?.tagName.toUpperCase()).toEqual('H1');
  });

  it('should shows an loading indicator while the user data is retrieved', async () => {
    render(<Profile />, { wrapper });

    expect(screen.queryByTestId('loading-indicator')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });
  });

  it('should contains an form for first_name and last_name with a submit button', async () => {
    render(<Profile />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    expect(screen.queryByRole('form')).toBeInTheDocument();
    expect(screen.queryByTestId('first-name-field')).toBeInTheDocument();
    expect(screen.queryByTestId('last-name-field')).toBeInTheDocument();
    expect(screen.queryByTestId('submit-button')).toBeInTheDocument();
  });

  it('should the initial values of the first_name and the last_name must be get from the api', async () => {
    const user = userFactory();
    server.use(
      rest.get(`${config.apiUrl}/auth/user/`, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json(user));
      })
    );

    render(<Profile />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    expect(screen.queryByTestId('first-name-field')).toHaveValue(
      user.first_name
    );
    expect(screen.queryByTestId('last-name-field')).toHaveValue(user.last_name);
  });

  it('should save the user data to the api when click on the submit button', async () => {
    const apiCallback = jest.fn();
    const user = userFactory();
    server.use(
      rest.patch(`${config.apiUrl}/auth/user/`, (req, res, ctx) => {
        apiCallback();
        return res.once(ctx.status(200), ctx.json(user));
      })
    );

    render(<Profile />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
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

    await waitFor(() => {
      expect(apiCallback).toHaveBeenCalledTimes(1);
    });
  });

  it('should update the context data when save the user data to the api', async () => {
    const user = userFactory();
    server.use(
      rest.patch(`${config.apiUrl}/auth/user/`, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json(user));
      })
    );

    let authState: AuthContextData;
    const MyComponent: FC = () => {
      authState = useAuth();

      return <Profile />;
    };

    render(<MyComponent />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
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

    await waitFor(() => {
      expect(authState.userData?.first_name).toEqual(user.first_name);
      expect(authState.userData?.last_name).toEqual(user.last_name);
    });
  });

  it('should show error informations in a toast when api return error', async () => {
    server.use(
      rest.patch(`${config.apiUrl}/auth/user/`, (req, res, ctx) => {
        return res.once(
          ctx.status(400),
          ctx.json({
            detail: 'custom error.',
          })
        );
      })
    );

    render(<Profile />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
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

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument();
    });

    expect(screen.queryByText(/^custom error\.$/i)).toBeInTheDocument();
  });

  it('should show error informations in a toast when gots validation error', async () => {
    render(<Profile />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    const first_name = screen.getByTestId('first-name-field');
    const last_name = screen.getByTestId('last-name-field');
    const button = screen.getByTestId('submit-button');

    await act(async () => {
      await userEvent.clear(first_name);
      await userEvent.type(last_name, 'Name');

      await userEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument();
    });

    expect(
      screen.queryByText(/^Insira um nome válido\.$/i)
    ).toBeInTheDocument();
  });
});
