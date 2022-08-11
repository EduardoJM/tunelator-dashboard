import { screen, render, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import { wrapper } from '@/mocks/contexts/wrapper';
import { waitLoaders } from '@/test/utils/loaders';
import config from '@/config';
import LatestReceivedMails from './LatestReceivedMails';

describe('LatestReceivedMails', () => {
  it('should render at least five mails if five mails exists for user and not render loading indicator', async () => {
    render(<LatestReceivedMails />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('latest-mail-row')).toHaveLength(5);
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
      expect(screen.queryByTestId('no-received-mails')).not.toBeInTheDocument();
    });
  });

  it('should page contains an button to see all informations', async () => {
    render(<LatestReceivedMails />, { wrapper });

    const button = screen.queryByTestId('all-button');

    expect(button).not.toBeNull();
    expect(button?.tagName.toUpperCase()).toEqual('BUTTON');

    await waitLoaders();
  });

  it('should page have an heading', async () => {
    render(<LatestReceivedMails />, { wrapper });

    expect(screen.queryByRole('heading')).toBeInTheDocument();

    await waitLoaders();
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

    await waitLoaders();

    expect(screen.queryAllByTestId('latest-mail-row')).toHaveLength(5);
  });

  it('should redirect to the received mails page when click in the more informations button', async () => {
    render(<LatestReceivedMails />, { wrapper });

    await waitLoaders();

    window.history.replaceState({}, '', '/any-route');
    expect(window.location.pathname).toEqual('/any-route');

    const button = screen.getByTestId('all-button');

    await act(async () => {
      await userEvent.click(button);
    });

    expect(window.location.pathname).toEqual('/received');
  });
});
