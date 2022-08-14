import {
  screen,
  render,
  act,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockOnce } from '@/mocks/server';
import accountFactory from '@/mocks/factories/account';
import { wrapper } from '@/mocks/contexts/wrapper';
import { waitLoaders } from '@/test/utils/loaders';
import LatestMailAccounts from './LatestMailAccounts';

describe('LatestMailAccounts', () => {
  it('should render at least five accounts if five accounts exists for user and not render loading indicator', async () => {
    render(<LatestMailAccounts />, { wrapper });

    await waitLoaders();

    await waitFor(() => {
      expect(screen.queryAllByTestId('latest-accounts-row')).toHaveLength(5);
      expect(screen.queryByTestId('no-accounts-box')).not.toBeInTheDocument();
    });
  });

  it('should page contains an button to see all informations', async () => {
    render(<LatestMailAccounts />, { wrapper });

    await waitLoaders();

    const button = screen.queryByTestId('all-button');

    expect(button).not.toBeNull();
    expect(button?.tagName.toUpperCase()).toEqual('BUTTON');
  });

  it('should page have an heading', async () => {
    render(<LatestMailAccounts />, { wrapper });

    await waitLoaders();

    expect(screen.queryByRole('heading')).toBeInTheDocument();
  });

  it('should render an message indicating no received mails exists if nothing received mails are found', async () => {
    mockOnce('get', '/mails/accounts/', 200, {
      count: 0,
      next: 'string | null',
      previous: 'string | null',
      results: [],
    });

    render(<LatestMailAccounts />, { wrapper });

    await waitLoaders();

    await waitFor(() => {
      expect(screen.queryAllByTestId('latest-accounts-row')).toHaveLength(0);
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

    await waitLoaders();
  });

  it('should redirect to the mail accounts page when click in the more informations button', async () => {
    render(<LatestMailAccounts />, { wrapper });

    await waitLoaders();

    window.history.replaceState({}, '', '/any-route');
    expect(window.location.pathname).toEqual('/any-route');

    const button = screen.getByTestId('all-button');

    await act(async () => {
      await userEvent.click(button);
    });

    expect(window.location.pathname).toEqual('/mails');
  });

  it('should have an toggle button in all items of the table', async () => {
    mockOnce('get', '/mails/accounts/', 200, {
      count: 2,
      next: 'string | null',
      previous: 'string | null',
      results: Array.from({ length: 2 }).map((_, index) =>
        accountFactory({ id: index + 1 })
      ),
    });

    render(<LatestMailAccounts />, { wrapper });

    await waitLoaders();

    await waitFor(() => {
      expect(screen.queryAllByTestId('latest-accounts-row')).toHaveLength(2);
    });

    const items = screen.getAllByTestId('latest-accounts-row');
    for (const row of items) {
      expect(row.querySelector('[type=checkbox]')).toBeInTheDocument();
    }
  });

  it('should click on the toggle button must change the item redirect_enabled at api', async () => {
    mockOnce('get', '/mails/accounts/', 200, {
      count: 2,
      next: 'string | null',
      previous: 'string | null',
      results: [accountFactory({ id: 1, redirect_enabled: false })],
    });
    const apiCallback = mockOnce('patch', '/mails/accounts/:id/', 200, {});

    render(<LatestMailAccounts />, { wrapper });

    await waitLoaders();

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
    mockOnce('patch', '/mails/accounts/:id/', 400, {
      detail: 'custom error message',
    });

    render(<LatestMailAccounts />, { wrapper });

    await waitLoaders();

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
