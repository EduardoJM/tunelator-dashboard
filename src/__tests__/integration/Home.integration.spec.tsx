import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queryClient } from '@/__mocks__/queryClient';
import { mockOnce, mockOnceWithDelay } from '@/__mocks__/server';
import { accounts, receivedMails, socialContent } from '@/__mocks__/fixtures';
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

  it('should render an NavBar component', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    await waitFor(() => {
      const navbar = screen.queryByTestId('navbar');
      expect(navbar).toBeInTheDocument();
    });
  });

  it('should render an Footer component', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    await waitFor(() => {
      const footer = screen.queryByTestId('footer');
      expect(footer).toBeInTheDocument();
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

  it('should render an error boundary if the mail accounts API gots an error', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');
    mockOnce('get', '/mails/accounts/', 400, {});

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();
    await waitTableSkeleton();

    await waitFor(() => {
      const boundary = screen.queryByTestId('mail-accounts-boundary');
      expect(boundary).toBeInTheDocument();
    });
  });

  it('should render an error boundary if the received mails API gots an error', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');
    mockOnce('get', '/mails/received/', 400, {});

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();
    await waitTableSkeleton();

    await waitFor(() => {
      const boundary = screen.queryByTestId('received-mails-boundary');
      expect(boundary).toBeInTheDocument();
    });
  });

  it('should render an skeleton when loading social contents', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');
    mockOnceWithDelay('get', '/content/', 200, socialContent, 600);

    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    expect(screen.queryByTestId('social-content-skeleton')).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.queryByTestId('social-content-skeleton')
      ).not.toBeInTheDocument();
    });
  });

  it('should render correctly social contents data', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');
    mockOnce('get', '/content/', 200, socialContent);

    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();
    await waitFor(() => {
      expect(
        screen.queryByTestId('social-content-skeleton')
      ).not.toBeInTheDocument();
    });

    const cards = screen.queryAllByTestId('social-content-card');
    expect(cards).toHaveLength(socialContent.results.length);

    for (let i = 0; i < cards.length; i += 1) {
      const title = cards[i].querySelector('h2') as HTMLElement;
      expect(title.textContent).toEqual(socialContent.results[i].title);
    }
  });

  it('should render an error boundary if error loading social contents', async () => {
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');
    mockOnce('get', '/content/', 400, {});

    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();
    await waitFor(() => {
      expect(
        screen.queryByTestId('social-content-skeleton')
      ).not.toBeInTheDocument();
    });

    expect(screen.queryByTestId('social-content-boundary')).toBeInTheDocument();
  });
});
