import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queryClient } from '@/__mocks__/queryClient';
import { mockOnceWithDelay } from '@/__mocks__/server';
import { accounts } from '@/__mocks__/fixtures';
import { waitAbsoluteLoader, setMediaWidth } from '@/utils/tests';
import App from '@/App';

describe('Footer', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');
  });

  it('should contains an link to the our instagram', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const instagram = 'https://instagram.com/tunelator.com.br';
    const footer = screen.getByTestId('footer');
    const link = footer.querySelector(`a[href="${instagram}"]`);
    expect(link).toBeInTheDocument();
  });

  it('should contains an link to the mails accounts', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const footer = screen.getByTestId('footer');
    const link = footer.querySelector('a[href="/mails"]');
    expect(link).toBeInTheDocument();
  });

  it('should redirect to the accounts when click on the accounts link', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const footer = screen.getByTestId('footer');
    const link = footer.querySelector('a[href="/mails"]') as HTMLElement;

    mockOnceWithDelay('get', '/mails/accounts/', 200, accounts, 500);
    await act(async () => {
      await userEvent.click(link);
    });
    await waitAbsoluteLoader();

    let skeleton = screen.queryByTestId('accounts-skeleton');
    expect(skeleton).toBeInTheDocument();

    expect(window.location.pathname).toEqual('/mails');
    const button = screen.queryByTestId('all-accounts-button');
    expect(button).not.toBeInTheDocument();

    await waitFor(() => {
      let skeleton = screen.queryByTestId('accounts-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });
  });

  it('should contains an link to the received mails', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const footer = screen.getByTestId('footer');
    const link = footer.querySelector('a[href="/received"]');
    expect(link).toBeInTheDocument();
  });

  it('should redirect to the received mails page when click on the received link', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const footer = screen.getByTestId('footer');
    const link = footer.querySelector('a[href="/received"]') as HTMLElement;

    await act(async () => {
      await userEvent.click(link);
    });
    await waitAbsoluteLoader();

    await waitAbsoluteLoader();

    expect(window.location.pathname).toEqual('/received');
    const button = screen.queryByTestId('all-accounts-button');
    expect(button).not.toBeInTheDocument();
  });

  it('should contains an link to the plans', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const footer = screen.getByTestId('footer');
    const link = footer.querySelector('a[href="/plans"]');
    expect(link).toBeInTheDocument();
  });

  it('should redirect to the plans page when click on the plans link', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const footer = screen.getByTestId('footer');
    const link = footer.querySelector('a[href="/plans"]') as HTMLElement;

    await act(async () => {
      await userEvent.click(link);
    });
    await waitAbsoluteLoader();

    await waitAbsoluteLoader();

    expect(window.location.pathname).toEqual('/plans');
    const button = screen.queryByTestId('all-accounts-button');
    expect(button).not.toBeInTheDocument();
    expect(screen.queryByTestId('current-plan-section')).toBeInTheDocument();
  });

  it('should contains an link to the profile', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const footer = screen.getByTestId('footer');
    const link = footer.querySelector('a[href="/customer/profile"]');
    expect(link).toBeInTheDocument();
  });

  it('should redirect to the customer profile page when click on the profile link', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const footer = screen.getByTestId('footer');
    const link = footer.querySelector(
      'a[href="/customer/profile"]'
    ) as HTMLElement;

    await act(async () => {
      await userEvent.click(link);
    });
    await waitAbsoluteLoader();

    await waitAbsoluteLoader();

    expect(window.location.pathname).toEqual('/customer/profile');
    const button = screen.queryByTestId('all-accounts-button');
    expect(button).not.toBeInTheDocument();
  });

  it('should have three columns', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const footer = screen.getByTestId('footer');
    const columns = footer.querySelectorAll('.chakra-container > div > div');
    expect(columns).toHaveLength(3);
  });

  it('should the columns have 100% width on small devices', async () => {
    setMediaWidth(765);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const footer = screen.getByTestId('footer');
    const columns = footer.querySelectorAll('.chakra-container > div > div');

    for (const column of columns) {
      expect(column).toHaveStyle('width: 100%');
    }
  });

  it('should the first column have 100% width and the others have 50% width on medium devices', async () => {
    setMediaWidth(978);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const footer = screen.getByTestId('footer');
    const columns = footer.querySelectorAll('.chakra-container > div > div');

    let index = 0;
    for (const column of columns) {
      if (index == 0) {
        expect(column).toHaveStyle('width: 100%');
      } else {
        expect(column).toHaveStyle('width: 50%');
      }
      index = index + 1;
    }
  });

  it('should the columns have 33.33% width on large devices', async () => {
    setMediaWidth(992);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const footer = screen.getByTestId('footer');
    const columns = footer.querySelectorAll('.chakra-container > div > div');

    for (const column of columns) {
      expect(column).toHaveStyle('width: 33.33%');
    }
  });
});
