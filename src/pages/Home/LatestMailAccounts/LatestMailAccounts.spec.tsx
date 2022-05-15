import {
  screen,
  render,
  act,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import userEvent from '@testing-library/user-event';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import LatestMailAccounts from './LatestMailAccounts';
import config from '../../../config';
import { LoadingProvider } from '../../../contexts/loading';

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
    <BrowserRouter>
      <LoadingProvider>{children}</LoadingProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

describe('LatestMailAccounts', () => {
  it('should render at least five accounts if five accounts exists for user and not render loading indicator', async () => {
    render(<LatestMailAccounts />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('latest-accounts-row')).toHaveLength(5);
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
      expect(screen.queryByTestId('no-accounts-box')).not.toBeInTheDocument();
    });
  });

  it('should page contains an button to see all informations', () => {
    render(<LatestMailAccounts />, { wrapper });

    const button = screen.queryByText(/^Ver Tudo$/i);

    expect(button).not.toBeNull();
    expect(button?.tagName.toUpperCase()).toEqual('BUTTON');
  });

  it('should page have an heading', () => {
    render(<LatestMailAccounts />, { wrapper });

    expect(screen.queryByRole('heading')).toBeInTheDocument();
  });

  it('should render an message indicating no received mails exists if nothing received mails are found', async () => {
    server.use(
      rest.get(`${config.apiUrl}/mails/accounts/`, (req, res, ctx) => {
        return res.once(
          ctx.status(200),
          ctx.json({
            count: 0,
            next: 'string | null',
            previous: 'string | null',
            results: [],
          })
        );
      })
    );

    render(<LatestMailAccounts />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('latest-accounts-row')).toHaveLength(0);
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
      expect(screen.queryByTestId('no-accounts-box')).toBeInTheDocument();
    });
  });

  it('should render an loading indicator while fetching data', async () => {
    render(<LatestMailAccounts />, { wrapper });

    expect(screen.queryByTestId('loading-indicator')).toBeInTheDocument();
    expect(screen.queryAllByTestId('latest-accounts-row')).toHaveLength(0);

    await waitForElementToBeRemoved(screen.queryByTestId('loading-indicator'));

    expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    expect(screen.queryAllByTestId('latest-accounts-row')).toHaveLength(5);
  });

  it('should redirect to the mail accounts page when click in the more informations button', async () => {
    render(<LatestMailAccounts />, { wrapper });

    window.history.replaceState({}, '', '/any-route');
    expect(window.location.pathname).toEqual('/any-route');

    const button = screen.getByText(/^Ver Tudo$/i);

    await act(async () => {
      await userEvent.click(button);
    });

    expect(window.location.pathname).toEqual('/mails');
  });

  it('should have an toggle button in all items of the table', async () => {
    server.use(
      rest.get(`${config.apiUrl}/mails/accounts/`, (req, res, ctx) => {
        return res.once(
          ctx.status(200),
          ctx.json({
            count: 2,
            next: 'string | null',
            previous: 'string | null',
            results: [
              {
                id: 1,
                created_at: '2022-04-22T10:24:45',
                mail_user: 'example',
                mail: 'example@example.com.br',
                name: 'Account Name',
                plan_enabled: true,
                redirect_enabled: false,
                redirect_to: 'example@example.com',
                updated_at: '2022-04-22T10:24:45',
              },
              {
                id: 2,
                created_at: '2022-04-22T10:24:45',
                mail_user: 'example',
                mail: 'example@example.com.br',
                name: 'Account Name',
                plan_enabled: true,
                redirect_enabled: true,
                redirect_to: 'example@example.com',
                updated_at: '2022-04-22T10:24:45',
              },
            ],
          })
        );
      })
    );

    render(<LatestMailAccounts />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('latest-accounts-row')).toHaveLength(2);
    });

    const items = screen.getAllByTestId('latest-accounts-row');
    for (const row of items) {
      expect(row.querySelector('[type=checkbox]')).toBeInTheDocument();
    }
  });

  it('should click on the toggle button must change the item redirect_enabled at api', async () => {
    const apiCallback = jest.fn();

    server.use(
      rest.get(`${config.apiUrl}/mails/accounts/`, (req, res, ctx) => {
        return res.once(
          ctx.status(200),
          ctx.json({
            count: 2,
            next: 'string | null',
            previous: 'string | null',
            results: [
              {
                id: 1,
                created_at: '2022-04-22T10:24:45',
                mail_user: 'example',
                mail: 'example@example.com.br',
                name: 'Account Name',
                plan_enabled: true,
                redirect_enabled: false,
                redirect_to: 'example@example.com',
                updated_at: '2022-04-22T10:24:45',
              },
            ],
          })
        );
      }),
      rest.patch(`${config.apiUrl}/mails/accounts/:id/`, (req, res, ctx) => {
        apiCallback(req.body);

        return res.once(ctx.status(200), ctx.json({}));
      })
    );

    render(<LatestMailAccounts />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('latest-accounts-row')).toHaveLength(1);
    });

    const row = screen.getByTestId('latest-accounts-row');

    const checkbox = row.querySelector('[type=checkbox]');

    await act(async () => {
      await userEvent.click(checkbox || new Element());
    });

    await waitFor(() => {
      expect(apiCallback).toHaveBeenCalledTimes(1);
      expect(apiCallback).toHaveBeenCalledWith({ redirect_enabled: true });
    });
  });

  it('should click on the toggle button and got error, this error goes to the screen as an toast', async () => {
    server.use(
      rest.patch(`${config.apiUrl}/mails/accounts/:id/`, (req, res, ctx) => {
        return res.once(
          ctx.status(400),
          ctx.json({
            detail: 'custom error message',
          })
        );
      })
    );

    render(<LatestMailAccounts />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('latest-accounts-row')).toHaveLength(5);
    });

    const row = screen.getAllByTestId('latest-accounts-row')[0];

    const checkbox = row.querySelector('[type=checkbox]');

    await act(async () => {
      await userEvent.click(checkbox || new Element());
    });

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument();
    });

    expect(screen.queryByText(/^custom error message$/i)).toBeInTheDocument();
  });
});
