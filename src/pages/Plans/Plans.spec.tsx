import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wrapper } from '@/mocks/contexts/wrapper';
import { activePlan, plans } from '@/mocks/fixtures';
import { mockOnce } from '@/mocks/server';
import { PlanType } from '@/entities/Plan';
import Plans from './Plans';

describe('Plans', () => {
  it('should contains an CurrentPlanSection', () => {
    render(<Plans />, { wrapper });

    expect(screen.queryByTestId('current-plan-section')).toBeInTheDocument();
  });

  it('should show the already-paid message when the plan is non-free', async () => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    mockOnce('get', '/plans/active/', 200, {
      ...activePlan,
      plan_type: PlanType.Paid,
    });

    render(<Plans />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(0);
    });

    expect(screen.queryByTestId('already-paid-section')).toBeInTheDocument();
  });

  it('should show an loading indicator when is fetching the plans from the api', async () => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    mockOnce('get', '/plans/active/', 200, {
      ...activePlan,
      plan_type: PlanType.Free,
    });
    mockOnce('get', '/plans', 200, plans);

    render(<Plans />, { wrapper });

    expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(1);
    await waitFor(() => {
      expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(0);
    });
  });

  it('should show an plans grid when the plan is free', async () => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    mockOnce('get', '/plans/active/', 200, {
      ...activePlan,
      plan_type: PlanType.Free,
    });

    render(<Plans />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(0);
    });

    expect(screen.queryByText(/^plans\.title$/i)).toBeInTheDocument();
    expect(screen.queryAllByTestId('plan-item')).toHaveLength(plans.length);
    expect(screen.queryByTestId('go-to-checkout-button')).toBeInTheDocument();
  });

  it('should the go to checkout button initial state must be disabled', async () => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    mockOnce('get', '/plans/active/', 200, {
      ...activePlan,
      plan_type: PlanType.Free,
    });

    render(<Plans />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(0);
    });

    const button = screen.getByTestId('go-to-checkout-button');
    expect(button).toBeDisabled();
  });

  it('should enable the go to checkout button when we click on select on an plan item', async () => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    mockOnce('get', '/plans/active/', 200, {
      ...activePlan,
      plan_type: PlanType.Free,
    });

    render(<Plans />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(0);
    });

    const [plan] = screen.queryAllByTestId('plan-item');

    const [selectButton] = plan.querySelectorAll('button');

    await act(async () => {
      await userEvent.click(selectButton);
    });

    const button = screen.getByTestId('go-to-checkout-button');
    expect(button).not.toBeDisabled();
  });

  it('should the api route called to create checkout when select an plan and click on the continue button', async () => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    const checkout_id = '12345666456';

    mockOnce('get', '/plans/active/', 200, {
      ...activePlan,
      plan_type: PlanType.Free,
    });
    const apiCallback = mockOnce('post', '/payments/checkout/', 201, {
      checkout_id,
    });

    render(<Plans />, { wrapper });
    await waitFor(() => {
      expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(0);
    });

    const [plan] = screen.queryAllByTestId('plan-item');
    const [selectButton] = plan.querySelectorAll('button');
    await act(async () => {
      await userEvent.click(selectButton);
    });

    const button = screen.getByTestId('go-to-checkout-button');
    await act(async () => {
      await userEvent.click(button);
    });

    const formSubmit = jest.fn();
    HTMLFormElement.prototype.submit = formSubmit;

    await waitFor(() => {
      expect(apiCallback).toHaveBeenCalledTimes(1);
      expect(formSubmit).toHaveBeenCalledTimes(1);
    });
    const form = screen.queryByTestId<HTMLFormElement>(
      'go-to-checkout-helper-form'
    );
    expect(form).toBeInTheDocument();
    expect(form?.action).toMatch(checkout_id);
  });

  it('should call the api when click on the customer portal button', async () => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    const manager_id = '1234656565';

    mockOnce('get', '/plans/active/', 200, {
      ...activePlan,
      plan_type: PlanType.Paid,
    });
    const apiCallback = mockOnce('post', '/payments/manage/', 201, {
      manager_id,
    });

    render(<Plans />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(0);
    });

    const [button] = screen.getAllByTestId('customer-portal-button');
    await act(async () => {
      await userEvent.click(button);
    });

    const formSubmit = jest.fn();
    HTMLFormElement.prototype.submit = formSubmit;

    await waitFor(() => {
      expect(apiCallback).toHaveBeenCalledTimes(1);
      expect(formSubmit).toHaveBeenCalledTimes(1);
    });

    const form = screen.queryByTestId<HTMLFormElement>(
      'go-to-customer-portal-form'
    );
    expect(form).toBeInTheDocument();
    expect(form?.action).toMatch(manager_id);
  });
});
