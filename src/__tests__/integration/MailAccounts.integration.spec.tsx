import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queryClient } from '@/__mocks__/queryClient';
import { mockOnce, mockOnceWithDelay } from '@/__mocks__/server';
import { accounts, receivedMails } from '@/__mocks__/fixtures';
import { waitAbsoluteLoader, waitForTime } from '@/utils/tests';
import App from '@/App';

describe('MailAccounts', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/mails');
  });

  it('should redirect to login page if user is not authenticated', async () => {
    window.sessionStorage.clear();

    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    await waitFor(() => {
      expect(screen.queryByTestId('login-box')).toBeInTheDocument();
    });
    expect(window.location.pathname).toEqual('/auth');
  });

  it('should render an NavBar component', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const navbar = screen.queryByTestId('navbar');
    expect(navbar).toBeInTheDocument();

    await waitFor(() => {
      let skeleton = screen.queryByTestId('accounts-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });
  });

  it('should render an Footer component', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();

    await waitFor(() => {
      let skeleton = screen.queryByTestId('accounts-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });
  });

  it('should display an account skeleton when accounts is loading', async () => {
    mockOnceWithDelay('get', '/mails/accounts/', 200, accounts, 500);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    let skeleton = screen.queryByTestId('accounts-skeleton');
    expect(skeleton).toBeInTheDocument();

    await waitFor(() => {
      let skeleton = screen.queryByTestId('accounts-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });
  });

  it('should render the API data into accounts cards', async () => {
    mockOnce('get', '/mails/accounts/', 200, accounts);

    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    await waitFor(() => {
      let skeleton = screen.queryByTestId('accounts-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });

    const cards = screen.queryAllByTestId('mail-account-card');
    const items = accounts.results;

    expect(cards.length).toEqual(items.length);
    for (let i = 0; i < cards.length; i += 1) {
      const card = cards[i];
      const item = items[i];

      const title = card.querySelector('h2')?.textContent;
      expect(title).toEqual(item.name);
    }
  });

  it('should display an error boundary when got error in accounts api', async () => {
    mockOnce('get', '/mails/accounts/', 400, {});

    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();
    await waitFor(() => {
      const skeleton = screen.queryByTestId('accounts-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });

    await waitFor(() => {
      const boundary = screen.queryByTestId('mail-accounts-boundary');
      expect(boundary).toBeInTheDocument();
    });

    await waitForTime(1000);
  });
});
