import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queryClient } from '@/__mocks__/queryClient';
import { waitAbsoluteLoader } from '@/utils/tests';
import App from '@/App';

describe('Checkout.Canceled', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/checkout/canceled');
  });

  it('should redirect to /auth page if user is not authenticated', async () => {
    window.sessionStorage.clear();

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    expect(window.location.pathname).toEqual('/auth');
    expect(screen.queryByTestId('login-box')).toBeInTheDocument();
  });

  it('should contains two buttons, one to plans and one to support, in the page', async () => {
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const plansButton = screen.getByTestId('plans-button');

    expect(plansButton).toBeInTheDocument();
    expect(plansButton.tagName.toUpperCase()).toEqual('BUTTON');
  });

  it('should contains informations about payment canceled on the page', async () => {
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const heading = screen.getByText(/^checkout\.canceled\.title$/i);
    const body = screen.getByText(/^checkout\.canceled\.body$/i);

    expect(heading).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it('should navigate to /plans page when click on the plans button', async () => {
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
