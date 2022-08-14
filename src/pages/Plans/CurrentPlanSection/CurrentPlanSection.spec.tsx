import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wrapper } from '@/mocks/contexts/wrapper';
import { activePlan } from '@/mocks/fixtures';
import { mockOnce } from '@/mocks/server';
import { PlanType } from '@/entities/Plan';
import CurrentPlanSection from './CurrentPlanSection';

describe('CurrentPlanSection', () => {
  beforeEach(() => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
  });

  it('should render an loading indicator until data is fetched from api', async () => {
    render(<CurrentPlanSection onGoToCustomerPortal={() => {}} />, { wrapper });

    expect(screen.queryByTestId('loading-indicator')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });
  });

  it('should render an box with the current plan informations', async () => {
    render(<CurrentPlanSection onGoToCustomerPortal={() => {}} />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    const title = screen.queryByText(activePlan.name);
    const description = screen.queryByText(activePlan.description);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('should not render the manage button if the plan is free', async () => {
    mockOnce('get', '/plans/active/', 200, {
      ...activePlan,
      plan_type: PlanType.Free,
    });

    render(<CurrentPlanSection onGoToCustomerPortal={() => {}} />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

  it('should render the manage button if the plan is not free', async () => {
    mockOnce('get', '/plans/active/', 200, {
      ...activePlan,
      plan_type: PlanType.Paid,
    });

    render(<CurrentPlanSection onGoToCustomerPortal={() => {}} />, { wrapper });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    const button = screen.queryByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should call onGoToCustomerPortal when click on the the manage button', async () => {
    mockOnce('get', '/plans/active/', 200, {
      ...activePlan,
      plan_type: PlanType.Paid,
    });

    const onGoToCustomerPortal = jest.fn();
    render(<CurrentPlanSection onGoToCustomerPortal={onGoToCustomerPortal} />, {
      wrapper,
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    const button = screen.getByRole('button');

    await act(async () => {
      await userEvent.click(button);
    });

    expect(onGoToCustomerPortal).toHaveBeenCalledTimes(1);
  });
});
