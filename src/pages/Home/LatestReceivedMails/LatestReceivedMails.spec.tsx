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
import LatestReceivedMails from './LatestReceivedMails';
import config from '../../../config';

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
    <BrowserRouter>{children}</BrowserRouter>
  </QueryClientProvider>
);

describe('LatestReceivedMails', () => {
  it('should render at least five mails if five mails exists for user and not render loading indicator', async () => {
    render(<LatestReceivedMails />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('latest-mail-row')).toHaveLength(5);
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
      expect(screen.queryByTestId('no-received-mails')).not.toBeInTheDocument();
    });
  });

  it('should page contains an button to see all informations', () => {
    render(<LatestReceivedMails />, { wrapper });

    const button = screen.queryByText(/^Ver Todas as Informações$/i);

    expect(button).not.toBeNull();
    expect(button?.tagName.toUpperCase()).toEqual('BUTTON');
  });

  it('should page have an heading', () => {
    render(<LatestReceivedMails />, { wrapper });

    expect(screen.queryByRole('heading')).toBeInTheDocument();
  });

  it('should render an message indicating no received mails exists if nothing received mails are found', async () => {
    server.use(
      rest.get(`${config.apiUrl}/mails/received/`, (req, res, ctx) => {
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

    render(<LatestReceivedMails />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('latest-mail-row')).toHaveLength(0);
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
      expect(screen.queryByTestId('no-received-mails')).toBeInTheDocument();
    });
  });

  it('should render an loading indicator while fetching data', async () => {
    render(<LatestReceivedMails />, { wrapper });

    expect(screen.queryByTestId('loading-indicator')).toBeInTheDocument();
    expect(screen.queryAllByTestId('latest-mail-row')).toHaveLength(0);

    await waitForElementToBeRemoved(screen.queryByTestId('loading-indicator'));

    expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    expect(screen.queryAllByTestId('latest-mail-row')).toHaveLength(5);
  });

  it('should redirect to the received mails page when click in the more informations button', async () => {
    render(<LatestReceivedMails />, { wrapper });

    window.history.replaceState({}, '', '/any-route');
    expect(window.location.pathname).toEqual('/any-route');

    const button = screen.getByText(/^Ver Todas as Informações$/i);

    await act(async () => {
      await userEvent.click(button);
    });

    expect(window.location.pathname).toEqual('/received');
  });
});
