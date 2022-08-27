import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queryClient } from '@/__mocks__/queryClient';
import { mockOnceWithDelay } from '@/__mocks__/server';
import { accounts } from '@/__mocks__/fixtures';
import { waitAbsoluteLoader, setMediaWidth } from '@/utils/tests';
import App from '@/App';

describe('NavBar', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/');
  });

  it('should contains an link the mails accounts if width is large', async () => {
    setMediaWidth(769);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const navbar = screen.getByTestId('navbar');
    const link = navbar.querySelector('a[href="/mails"]');
    expect(link).toBeVisible();
  });

  it('should not contains an link the mails accounts if width is small', async () => {
    setMediaWidth(767);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const navbar = screen.getByTestId('navbar');
    const link = navbar.querySelector('a[href="/mails"]');
    expect(link).not.toBeVisible();
  });

  it('should redirect to /mails when click on the mails link', async () => {
    setMediaWidth(769);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    let button = screen.queryByTestId('all-accounts-button');
    expect(button).toBeInTheDocument();

    const navbar = screen.getByTestId('navbar');
    const link = navbar.querySelector('a[href="/mails"]') as HTMLElement;

    mockOnceWithDelay('get', '/mails/accounts/', 200, accounts, 500);

    await act(async () => {
      await userEvent.click(link);
    });

    await waitAbsoluteLoader();

    let skeleton = screen.queryByTestId('accounts-skeleton');
    expect(skeleton).toBeInTheDocument();

    button = screen.queryByTestId('all-accounts-button');
    expect(window.location.pathname).toEqual('/mails');
    expect(button).not.toBeInTheDocument();
    await waitFor(() => {
      let skeleton = screen.queryByTestId('accounts-skeleton');
      expect(skeleton).not.toBeInTheDocument();
    });
  });

  it('should contains an link to the plans if width is large', async () => {
    setMediaWidth(769);
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const navbar = screen.getByTestId('navbar');
    const link = navbar.querySelector('a[href="/plans"]');
    expect(link).toBeVisible();
  });

  it('should not contains an link to the plans if width is small', async () => {
    setMediaWidth(767);
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const navbar = screen.getByTestId('navbar');
    const link = navbar.querySelector('a[href="/plans"]');
    expect(link).not.toBeVisible();
  });

  it('should redirect to /plans when click on the plans link', async () => {
    setMediaWidth(769);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    let button = screen.queryByTestId('all-accounts-button');
    expect(button).toBeInTheDocument();

    const navbar = screen.getByTestId('navbar');
    const link = navbar.querySelector('a[href="/plans"]') as HTMLElement;

    await act(async () => {
      await userEvent.click(link);
    });

    await waitAbsoluteLoader();

    button = screen.queryByTestId('all-accounts-button');
    expect(window.location.pathname).toEqual('/plans');
    expect(button).not.toBeInTheDocument();
    expect(screen.queryByTestId('current-plan-section')).toBeInTheDocument();
  });

  it('should contains an link to the received mails if width is large', async () => {
    setMediaWidth(769);
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const navbar = screen.getByTestId('navbar');
    const link = navbar.querySelector('a[href="/received"]');
    expect(link).toBeVisible();
  });

  it('should not contains an link to the plans if width is small', async () => {
    setMediaWidth(767);
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const navbar = screen.getByTestId('navbar');
    const link = navbar.querySelector('a[href="/received"]');
    expect(link).not.toBeVisible();
  });

  it('should redirect to /received when click on the received mails link', async () => {
    setMediaWidth(769);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    let button = screen.queryByTestId('all-accounts-button');
    expect(button).toBeInTheDocument();

    const navbar = screen.getByTestId('navbar');
    const link = navbar.querySelector('a[href="/received"]') as HTMLElement;

    await act(async () => {
      await userEvent.click(link);
    });

    await waitAbsoluteLoader();

    button = screen.queryByTestId('all-accounts-button');
    expect(window.location.pathname).toEqual('/received');
    expect(button).not.toBeInTheDocument();
  });

  it('should contains an link to the home if width is large', async () => {
    setMediaWidth(769);
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const navbar = screen.getByTestId('navbar');
    const [link] = Array.from(navbar.querySelectorAll('a[href="/"]')).filter(
      item => item.textContent == 'navbar.home'
    );
    expect(link).toBeVisible();
  });

  it('should not contains an link to the home if width is small', async () => {
    setMediaWidth(767);
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const navbar = screen.getByTestId('navbar');
    const [link] = Array.from(navbar.querySelectorAll('a[href="/"]')).filter(
      item => item.textContent == 'navbar.home'
    );
    expect(link).not.toBeVisible();
  });

  it('should redirect to / when click on the home link', async () => {
    window.history.replaceState({}, '', '/received');
    setMediaWidth(769);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    let button = screen.queryByTestId('all-accounts-button');
    expect(button).not.toBeInTheDocument();

    const navbar = screen.getByTestId('navbar');
    const link = navbar.querySelector('a[href="/"]') as HTMLElement;

    await act(async () => {
      await userEvent.click(link);
    });

    await waitAbsoluteLoader();

    button = screen.queryByTestId('all-accounts-button');
    expect(window.location.pathname).toEqual('/');
    expect(button).toBeInTheDocument();
  });

  it('should have an toggle button if screen is small', async () => {
    setMediaWidth(765);
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const navbar = screen.getByTestId('navbar');
    const toggle = navbar.querySelector('[data-testid="drawer-toggle"]');
    expect(toggle).toBeVisible();
  });

  it('should not have an toggle button if screen is large', async () => {
    setMediaWidth(769);
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const navbar = screen.getByTestId('navbar');
    const toggle = navbar.querySelector('[data-testid="drawer-toggle"]');
    expect(toggle).not.toBeVisible();
  });

  it('should sidenav not opened by default', async () => {
    setMediaWidth(765);
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const sidenav = screen.queryByTestId('sidenav');
    expect(sidenav).not.toBeInTheDocument();
  });

  it('should sidenav toggle to visible when click on the toggle button', async () => {
    setMediaWidth(765);
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    let sidenav = screen.queryByTestId('sidenav');
    const navbar = screen.getByTestId('navbar');
    expect(sidenav).not.toBeInTheDocument();

    const toggle = navbar.querySelector(
      '[data-testid="drawer-toggle"]'
    ) as HTMLElement;
    await act(async () => {
      await userEvent.click(toggle);
    });

    await waitFor(() => {
      sidenav = screen.queryByTestId('sidenav');
      expect(sidenav).toBeInTheDocument();
    });
  });

  it('should renders an avatar if the size is large', async () => {
    setMediaWidth(769);
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const navbar = screen.getByTestId('navbar');
    const avatar = navbar.querySelector('[data-testid="avatar"]');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toBeVisible();

    const menu = screen.queryByRole('menu');
    expect(menu).not.toBeInTheDocument();
  });

  it('should open the menu when click on the avatar in the NavBar', async () => {
    setMediaWidth(769);
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const navbar = screen.getByTestId('navbar');
    const avatar = navbar.querySelector(
      '[data-testid="avatar"]'
    ) as HTMLElement;
    const button = avatar.closest('button') as HTMLElement;

    await act(async () => {
      await userEvent.click(button);
    });

    await waitFor(() => {
      const menu = screen.queryByRole('menu');
      expect(menu).toBeInTheDocument();
    });
  });

  it('should redirect to the customer profile page when open the menu and click on the profile item', async () => {
    setMediaWidth(769);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    let button = screen.queryByTestId('all-accounts-button');
    expect(button).toBeInTheDocument();

    const navbar = screen.getByTestId('navbar');
    const avatar = navbar.querySelector(
      '[data-testid="avatar"]'
    ) as HTMLElement;
    const avatarButton = avatar.closest('button') as HTMLElement;

    await act(async () => {
      await userEvent.click(avatarButton);
    });

    await waitFor(() => {
      const menu = screen.queryByRole('menu');
      expect(menu).toBeInTheDocument();
    });

    const menu = screen.getByRole('menu');
    const menuitem = menu.querySelector(
      '[data-testid="profile"]'
    ) as HTMLElement;

    await act(async () => {
      await userEvent.click(menuitem);
    });
    await waitAbsoluteLoader();

    button = screen.queryByTestId('all-accounts-button');
    expect(window.location.pathname).toEqual('/customer/profile');
    expect(button).not.toBeInTheDocument();
  });

  it('should performs an logout when open the menu and click on the logout item', async () => {
    setMediaWidth(769);
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    let button = screen.queryByTestId('all-accounts-button');
    expect(button).toBeInTheDocument();

    const navbar = screen.getByTestId('navbar');
    const avatar = navbar.querySelector(
      '[data-testid="avatar"]'
    ) as HTMLElement;
    const avatarButton = avatar.closest('button') as HTMLElement;

    await act(async () => {
      await userEvent.click(avatarButton);
    });

    await waitFor(() => {
      const menu = screen.queryByRole('menu');
      expect(menu).toBeInTheDocument();
    });

    const menu = screen.getByRole('menu');
    const menuitem = menu.querySelector(
      '[data-testid="logout"]'
    ) as HTMLElement;

    await act(async () => {
      await userEvent.click(menuitem);
    });
    await waitAbsoluteLoader();

    expect(window.sessionStorage.getItem('@TUNELATOR_REFRESH')).toBeNull();
    expect(window.localStorage.getItem('@TUNELATOR_REFRESH')).toBeNull();
    expect(window.location.pathname).toEqual('/auth');
  });
});
