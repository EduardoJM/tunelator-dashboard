import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queryClient } from '@/__mocks__/queryClient';
import { mockOnceWithDelay } from '@/__mocks__/server';
import { accounts } from '@/__mocks__/fixtures';
import { waitAbsoluteLoader, setMediaWidth } from '@/utils/tests';
import App from '@/App';

const toggle = async (navbar: HTMLElement) => {
  const toggle = navbar.querySelector(
    '[data-testid="drawer-toggle"]'
  ) as HTMLElement;
  await act(async () => {
    await userEvent.click(toggle);
  });
};

describe('SideNav', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');
  });

  it('should sidenav contains all required buttons', async () => {
    setMediaWidth(765);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const navbar = screen.getByTestId('navbar');
    await toggle(navbar);

    await waitFor(() => {
      const sidenav = screen.queryByTestId('sidenav');
      expect(sidenav).toBeInTheDocument();
    });

    const sidenav = screen.getByTestId('sidenav');
    const homeButton = sidenav.querySelector('button[data-testid="home"]');
    const accountsButton = sidenav.querySelector(
      'button[data-testid="accounts"]'
    );
    const receivedButton = sidenav.querySelector(
      'button[data-testid="received"]'
    );
    const plansButton = sidenav.querySelector('button[data-testid="plans"]');
    const profileButton = sidenav.querySelector(
      'button[data-testid="profile"]'
    );
    const logoutButton = sidenav.querySelector('button[data-testid="logout"]');
    const backButton = sidenav.querySelector('button[data-testid="back"]');

    expect(homeButton).toBeInTheDocument();
    expect(accountsButton).toBeInTheDocument();
    expect(receivedButton).toBeInTheDocument();
    expect(plansButton).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
  });

  it('should close the sidenav when click on the back button', async () => {
    setMediaWidth(765);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const navbar = screen.getByTestId('navbar');
    await toggle(navbar);

    await waitFor(() => {
      const sidenav = screen.queryByTestId('sidenav');
      expect(sidenav).toBeInTheDocument();
    });

    const sidenav = screen.getByTestId('sidenav');
    const backButton = sidenav.querySelector(
      'button[data-testid="back"]'
    ) as HTMLElement;

    await act(async () => {
      await userEvent.click(backButton);
    });

    await waitFor(() => {
      const sidenav = screen.queryByTestId('sidenav');
      expect(sidenav).not.toBeInTheDocument();
    });
  });

  it('should perform logout if click on the logout button', async () => {
    setMediaWidth(765);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const navbar = screen.getByTestId('navbar');
    await toggle(navbar);

    await waitFor(() => {
      const sidenav = screen.queryByTestId('sidenav');
      expect(sidenav).toBeInTheDocument();
    });

    const sidenav = screen.getByTestId('sidenav');
    const logoutButton = sidenav.querySelector(
      'button[data-testid="logout"]'
    ) as HTMLElement;

    await act(async () => {
      await userEvent.click(logoutButton);
    });
    await waitAbsoluteLoader();

    expect(window.sessionStorage.getItem('@TUNELATOR_REFRESH')).toBeNull();
    expect(window.localStorage.getItem('@TUNELATOR_REFRESH')).toBeNull();
    expect(window.location.pathname).toEqual('/auth');
  });

  it('should redirect to /mails when click on the mails accounts button', async () => {
    setMediaWidth(765);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    let button = screen.queryByTestId('all-accounts-button');
    expect(button).toBeInTheDocument();

    const navbar = screen.getByTestId('navbar');
    await toggle(navbar);

    await waitFor(() => {
      const sidenav = screen.queryByTestId('sidenav');
      expect(sidenav).toBeInTheDocument();
    });

    const sidenav = screen.getByTestId('sidenav');
    const accountsButton = sidenav.querySelector(
      'button[data-testid="accounts"]'
    ) as HTMLElement;

    await act(async () => {
      await userEvent.click(accountsButton);
    });
    await waitAbsoluteLoader();

    button = screen.queryByTestId('all-accounts-button');
    expect(window.location.pathname).toEqual('/mails');
    expect(button).not.toBeInTheDocument();
    await waitFor(() => {
      let skeleton = screen.queryByTestId('accounts-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });
  });

  it('should redirect to /plans when click on the plans button', async () => {
    setMediaWidth(765);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    let button = screen.queryByTestId('all-accounts-button');
    expect(button).toBeInTheDocument();

    const navbar = screen.getByTestId('navbar');
    await toggle(navbar);

    await waitFor(() => {
      const sidenav = screen.queryByTestId('sidenav');
      expect(sidenav).toBeInTheDocument();
    });

    const sidenav = screen.getByTestId('sidenav');
    const plansButton = sidenav.querySelector(
      'button[data-testid="plans"]'
    ) as HTMLElement;

    await act(async () => {
      await userEvent.click(plansButton);
    });
    await waitAbsoluteLoader();

    button = screen.queryByTestId('all-accounts-button');
    expect(window.location.pathname).toEqual('/plans');
    expect(button).not.toBeInTheDocument();
    expect(screen.queryByTestId('current-plan-section')).toBeInTheDocument();
  });

  it('should redirect to /received when click on the received button', async () => {
    setMediaWidth(765);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    let button = screen.queryByTestId('all-accounts-button');
    expect(button).toBeInTheDocument();

    const navbar = screen.getByTestId('navbar');
    await toggle(navbar);

    await waitFor(() => {
      const sidenav = screen.queryByTestId('sidenav');
      expect(sidenav).toBeInTheDocument();
    });

    const sidenav = screen.getByTestId('sidenav');
    const receivedButton = sidenav.querySelector(
      'button[data-testid="received"]'
    ) as HTMLElement;

    await act(async () => {
      await userEvent.click(receivedButton);
    });
    await waitAbsoluteLoader();

    button = screen.queryByTestId('all-accounts-button');
    expect(window.location.pathname).toEqual('/received');
    expect(button).not.toBeInTheDocument();
  });

  it('should redirect to /customer/profile when click on the profile button', async () => {
    setMediaWidth(765);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    let button = screen.queryByTestId('all-accounts-button');
    expect(button).toBeInTheDocument();

    const navbar = screen.getByTestId('navbar');
    await toggle(navbar);

    await waitFor(() => {
      const sidenav = screen.queryByTestId('sidenav');
      expect(sidenav).toBeInTheDocument();
    });

    const sidenav = screen.getByTestId('sidenav');
    const profileButton = sidenav.querySelector(
      'button[data-testid="profile"]'
    ) as HTMLElement;

    await act(async () => {
      await userEvent.click(profileButton);
    });
    await waitAbsoluteLoader();

    button = screen.queryByTestId('all-accounts-button');
    expect(window.location.pathname).toEqual('/customer/profile');
    expect(button).not.toBeInTheDocument();
  });

  it('should redirect to / when click on the home button', async () => {
    window.history.replaceState({}, '', '/plans');
    setMediaWidth(765);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    let button = screen.queryByTestId('all-accounts-button');
    expect(button).not.toBeInTheDocument();

    const navbar = screen.getByTestId('navbar');
    await toggle(navbar);

    await waitFor(() => {
      const sidenav = screen.queryByTestId('sidenav');
      expect(sidenav).toBeInTheDocument();
    });

    const sidenav = screen.getByTestId('sidenav');
    const homeButton = sidenav.querySelector(
      'button[data-testid="home"]'
    ) as HTMLElement;

    await act(async () => {
      await userEvent.click(homeButton);
    });
    await waitAbsoluteLoader();

    button = screen.queryByTestId('all-accounts-button');
    expect(window.location.pathname).toEqual('/');
    expect(button).toBeInTheDocument();
  });
});
