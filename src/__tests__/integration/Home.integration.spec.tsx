import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockOnce } from '@/mocks/server';
import { waitAbsoluteLoader, waitTableSkeleton } from '@/test/utils/loaders';
import App from '@/App';

describe('Home', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it('should redirect to login page if user is not authenticated', async () => {
    window.history.replaceState({}, '', '/');

    render(<App />);

    await waitAbsoluteLoader();

    await waitFor(() => {
      expect(screen.queryByTestId('login-box')).toBeInTheDocument();
    });
  });

  it('should not redirect to login page if user is authenticated', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');

    render(<App />);

    await waitAbsoluteLoader();

    await waitFor(() => {
      expect(screen.queryByTestId('login-box')).not.toBeInTheDocument();
    });
  });

  it('should load the lastest mail accounts with five itens', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');

    render(<App />);

    await waitAbsoluteLoader();
    await waitTableSkeleton();

    const table = screen.getByTestId('latest-mail-accounts');

    expect(table).toBeInTheDocument();
    expect(table.querySelector('thead')).toBeInTheDocument();
    expect(table.querySelectorAll('thead tr')).toHaveLength(1);
    expect(table.querySelector('tbody')).toBeInTheDocument();
    expect(table.querySelectorAll('tbody tr')).toHaveLength(5);
  });

  it('should load the latest received mails with five itens', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');

    render(<App />);

    await waitAbsoluteLoader();
    await waitTableSkeleton();

    const table = screen.getByTestId('latest-received-mails');

    expect(table).toBeInTheDocument();
    expect(table.querySelector('thead')).toBeInTheDocument();
    expect(table.querySelectorAll('thead tr')).toHaveLength(1);
    expect(table.querySelector('tbody')).toBeInTheDocument();
    expect(table.querySelectorAll('tbody tr')).toHaveLength(5);
  });

  it('should have an button to see all accounts and an button to see all received mails', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');

    render(<App />);

    await waitAbsoluteLoader();
    await waitTableSkeleton();

    const allAccounts = screen.queryByTestId('all-accounts-button');
    const allReceived = screen.queryByTestId('all-received-button');

    expect(allAccounts).toBeInTheDocument();
    expect(allReceived).toBeInTheDocument();
  });

  it('should redirect to /mails when click on the all accounts button', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');

    render(<App />);

    await waitAbsoluteLoader();
    await waitTableSkeleton();

    const allAccounts = screen.getByTestId('all-accounts-button');

    await act(async () => {
      await userEvent.click(allAccounts);
    });

    await waitAbsoluteLoader();

    const table = screen.queryByTestId('latest-mail-accounts');

    expect(window.location.pathname).toEqual('/mails');
    expect(table).not.toBeInTheDocument();
  });

  it('should redirect to /received when click on the all received mails button', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');

    render(<App />);

    await waitAbsoluteLoader();
    await waitTableSkeleton();

    const allAccounts = screen.getByTestId('all-received-button');

    await act(async () => {
      await userEvent.click(allAccounts);
    });

    await waitAbsoluteLoader();

    const table = screen.queryByTestId('latest-received-mails');

    expect(window.location.pathname).toEqual('/received');
    expect(table).not.toBeInTheDocument();
  });
});
