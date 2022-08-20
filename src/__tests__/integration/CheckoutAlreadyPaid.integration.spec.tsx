import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queryClient } from '@/__mocks__/queryClient';
import { waitAbsoluteLoader } from '@/utils/tests';
import App from '@/App';

describe('Checkout.AlreadyPaid', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/checkout/already-paid');
  });

  it('should redirect to /auth page if user is not authenticated', async () => {
    window.sessionStorage.clear();

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    expect(window.location.pathname).toEqual('/auth');
    expect(screen.queryByTestId('login-box')).toBeInTheDocument();
  });

  it('must contains one button to plans in the page', async () => {
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const plansButton = screen.getByTestId('plans-button');

    expect(plansButton).toBeInTheDocument();
    expect(plansButton.tagName.toUpperCase()).toEqual('BUTTON');
  });

  it('must contain informations about already paid problem on the page', async () => {
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const heading = screen.getByText(/^checkout\.alreadypaid\.title$/i);
    const body = screen.getByText(/^checkout\.alreadypaid\.body$/i);

    expect(heading).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it('click on the plans button must navigate to plans', async () => {
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const plansButton = screen.getByTestId('plans-button');
    await act(async () => {
      await userEvent.click(plansButton);
    });

    expect(window.location.pathname).toEqual('/plans');

    await waitFor(() => {
      expect(screen.queryByTestId('plans-skeleton')).not.toBeInTheDocument();
    });
  });
});
