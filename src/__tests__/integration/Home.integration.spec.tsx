import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queryClient } from '@/__mocks__/queryClient';
import { mockOnce } from '@/__mocks__/server';
import { accounts, receivedMails } from '@/__mocks__/fixtures';
import { waitAbsoluteLoader, waitTableSkeleton } from '@/utils/tests';
import App from '@/App';

describe('Home', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it('should redirect to login page if user is not authenticated', async () => {
    window.history.replaceState({}, '', '/');

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    await waitFor(() => {
      expect(screen.queryByTestId('login-box')).toBeInTheDocument();
    });
  });

  it('should not redirect to login page if user is authenticated', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    await waitFor(() => {
      expect(screen.queryByTestId('login-box')).not.toBeInTheDocument();
    });
  });

  it('should load the lastest mail accounts with five itens', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');

    render(<App queryClient={queryClient} />);

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

    render(<App queryClient={queryClient} />);

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

    render(<App queryClient={queryClient} />);

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

    render(<App queryClient={queryClient} />);

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

    render(<App queryClient={queryClient} />);

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

  it('should render data of the latest five mail accounts on the table', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');
    const results = accounts.results.filter((_, index) => index < 5);
    mockOnce('get', '/mails/accounts/', 200, { ...accounts, results });

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();
    await waitTableSkeleton();

    await new Promise(resolve => setTimeout(resolve, 100));

    const table = screen.getByTestId('latest-mail-accounts');
    const rows = table.querySelectorAll('tbody tr');

    expect(rows).toHaveLength(results.length);

    for (let i = 0; i < results.length; i += 1) {
      const row = rows[i];
      const account = results[i];

      const columns = row.querySelectorAll('td');
      expect(columns).toHaveLength(5);
      expect(columns[0].textContent).toEqual(account.name);
      expect(columns[1].textContent).toEqual(account.mail);
      expect(columns[2]).not.toBeEmptyDOMElement();
      expect(columns[3]).not.toBeEmptyDOMElement();

      const checkbox = columns[4].querySelector('input[type=checkbox]');
      expect(checkbox).toBeInTheDocument();
    }
  });

  it('should render an placeholder if no latest mail accounts', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');
    mockOnce('get', '/mails/accounts/', 200, { ...accounts, results: [] });

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();
    await waitTableSkeleton();

    const box = screen.queryByTestId('no-accounts-box');
    expect(box).toBeInTheDocument();
    const button = box?.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('should redirect to /mails and open create account modal if click on button on placeholder', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');
    mockOnce('get', '/mails/accounts/', 200, { ...accounts, results: [] });

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();
    await waitTableSkeleton();

    await new Promise(resolve => setTimeout(resolve, 100));

    const box = screen.getByTestId('no-accounts-box');
    const button = box.querySelector('button') as HTMLButtonElement;

    await act(async () => {
      await userEvent.click(button);
    });

    await waitAbsoluteLoader();

    expect(window.location.pathname).toEqual('/mails');

    const modal = screen.queryByRole('alertdialog');
    expect(modal).toBeInTheDocument();
  });

  it('should render data of the latest five received mails on the table', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');
    const results = receivedMails.results.filter((_, index) => index < 5);
    mockOnce('get', '/mails/received/', 200, { ...receivedMails, results });

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();
    await waitTableSkeleton();

    await new Promise(resolve => setTimeout(resolve, 100));

    const table = screen.getByTestId('latest-received-mails');
    const rows = table.querySelectorAll('tbody tr');

    expect(rows).toHaveLength(results.length);

    for (let i = 0; i < results.length; i += 1) {
      const row = rows[i];
      const received = results[i];

      const columns = row.querySelectorAll('td');
      expect(columns).toHaveLength(4);
      expect(columns[0].textContent).toEqual(received.origin_mail);
      expect(columns[1].textContent).toEqual(received.mail.mail);
      expect(columns[2].textContent).toEqual(received.subject);
      expect(columns[3]).not.toBeEmptyDOMElement();
    }
  });

  it('should render an placeholder if no latest received mails', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');
    mockOnce('get', '/mails/received/', 200, { ...receivedMails, results: [] });

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();
    await waitTableSkeleton();

    const box = screen.queryByTestId('no-received-mails');
    expect(box).toBeInTheDocument();
  });
});
