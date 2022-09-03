import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queryClient } from '@/__mocks__/queryClient';
import { activePlan, plans } from '@/__mocks__/fixtures';
import { mockOnce, mockOnceWithDelay } from '@/__mocks__/server';
import { PlanType } from '@/entities/Plan';
import { waitAbsoluteLoader, waitForAlertInScreen } from '@/utils/tests';
import App from '@/App';

describe('Plans', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.history.replaceState({}, '', '/plans');
  });

  it('should redirect to /auth if user is not authenticated', async () => {
    window.sessionStorage.clear();
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const currentPlanSection = screen.queryByTestId('current-plan-section');

    expect(window.location.pathname).toEqual('/auth');
    expect(screen.queryByTestId('login-box')).toBeInTheDocument();
    expect(currentPlanSection).not.toBeInTheDocument();
  });

  it('should render an NavBar component', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const navbar = screen.queryByTestId('navbar');
    expect(navbar).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('plans-skeleton')).not.toBeInTheDocument();
    });
  });

  it('should render an Footer component', async () => {
    render(<App queryClient={queryClient} />);
    await waitAbsoluteLoader();

    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('plans-skeleton')).not.toBeInTheDocument();
    });
  });

  it('should contains an CurrentPlanSection', async () => {
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    expect(screen.queryByTestId('current-plan-section')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('plans-skeleton')).not.toBeInTheDocument();
    });
  });

  it('should show the already-paid message when the plan is non-free', async () => {
    mockOnce('get', '/plans/active/', 200, {
      ...activePlan,
      plan_type: PlanType.Paid,
    });
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    const section = screen.queryByTestId('already-paid-section');

    expect(section).toBeInTheDocument();

    const button = section?.querySelector(
      '[data-testid="customer-portal-button"]'
    );
    expect(button).toBeInTheDocument();
  });

  it('should show an skeleton loading indicator when is fetching the plans from the api', async () => {
    mockOnceWithDelay('get', '/plans/', 200, plans, 500);
    mockOnce('get', '/plans/active/', 200, {
      ...activePlan,
      plan_type: PlanType.Free,
    });

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    expect(screen.queryByTestId('plans-skeleton')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('plans-skeleton')).not.toBeInTheDocument();
    });
  });

  it('should show an plans grid when the plan is free', async () => {
    mockOnceWithDelay('get', '/plans/', 200, plans, 500);
    mockOnce('get', '/plans/active/', 200, {
      ...activePlan,
      plan_type: PlanType.Free,
    });

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    await waitFor(() => {
      expect(screen.queryByTestId('plans-skeleton')).not.toBeInTheDocument();
    });

    expect(screen.queryByText(/^plans\.title$/i)).toBeInTheDocument();

    const items = screen.queryAllByTestId('plan-item');
    expect(screen.queryAllByTestId('plan-item')).toHaveLength(plans.length);

    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      const plan = plans[i];

      expect(item.querySelector('h2')?.textContent).toEqual(plan.name);

      const priceText = item.querySelector('h3')?.textContent;
      const priceInBrl = (plan.monthly_price / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      expect(priceText).toEqual(`${priceInBrl}plansItem.monthPeriod`);

      const desc = item.querySelector('div > p.chakra-text')?.textContent;
      expect(desc).toEqual(plan.description);

      const feats = plan.display_features;
      const lis = item.querySelectorAll('ul[data-testid="feature-list"] > li');
      const elements = Array.from(lis).map(item => item.textContent);

      expect(feats.length).toEqual(elements.length);

      for (let j = 0; j < feats.length; j += 1) {
        expect(feats[j].name).toEqual(elements[j]);
      }
    }

    expect(screen.queryByTestId('go-to-checkout-button')).toBeInTheDocument();
  });

  it('should the go to checkout button initial state must be disabled', async () => {
    mockOnce('get', '/plans/active/', 200, {
      ...activePlan,
      plan_type: PlanType.Free,
    });

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    await waitFor(() => {
      expect(screen.queryByTestId('plans-skeleton')).not.toBeInTheDocument();
    });

    const button = screen.getByTestId('go-to-checkout-button');
    expect(button).toBeDisabled();
  });

  it('should enable the go to checkout button when we click on select on an plan item', async () => {
    mockOnce('get', '/plans/active/', 200, {
      ...activePlan,
      plan_type: PlanType.Free,
    });

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    await waitFor(() => {
      expect(screen.queryByTestId('plans-skeleton')).not.toBeInTheDocument();
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
    const checkout_id = '12345666456';

    mockOnce('get', '/plans/active/', 200, {
      ...activePlan,
      plan_type: PlanType.Free,
    });
    const apiCallback = mockOnce('post', '/payments/checkout/', 201, {
      checkout_id,
    });

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    await waitFor(() => {
      expect(screen.queryByTestId('plans-skeleton')).not.toBeInTheDocument();
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
    const manager_id = '1234656565';

    mockOnce('get', '/plans/active/', 200, {
      ...activePlan,
      plan_type: PlanType.Paid,
    });
    const apiCallback = mockOnce('post', '/payments/manage/', 201, {
      manager_id,
    });

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

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

  it('should render an error boundary if the api gots an error', async () => {
    mockOnce('get', '/plans/', 400, {});
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();
    await waitFor(() => {
      expect(screen.queryByTestId('plans-skeleton')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      const boundary = screen.queryByTestId('plans-boundary');
      expect(boundary).toBeInTheDocument();
    });
  });
});
