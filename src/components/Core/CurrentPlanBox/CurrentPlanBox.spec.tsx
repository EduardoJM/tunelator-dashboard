import { screen, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  PlanType,
  ActivePlan,
  ActivePlanResponse,
} from '../../../entities/Plan';
import CurrentPlanBox from './CurrentPlanBox';

const basePlan: ActivePlanResponse = {
  id: 12,
  description: 'The description',
  display_features: [
    {
      enabled: true,
      name: 'First feature',
    },
    {
      enabled: false,
      name: 'Last feature',
    },
  ],
  monthly_price: 544,
  plan_type: PlanType.Paid,
  name: 'My Plan',
  configs: [],
};

const plan = new ActivePlan(basePlan);
const planFree = new ActivePlan({
  ...basePlan,
  plan_type: PlanType.Free,
});

describe('CurrentPlanBox', () => {
  it('must have an my plan text, plan name and description', () => {
    render(<CurrentPlanBox plan={plan} onGoToCustomerPortalClick={() => {}} />);

    const myPlan = screen.queryByText(/^meu plano$/i);
    const name = screen.queryByText(/^my plan$/i);
    const description = screen.queryByText(/^the description$/i);

    expect(myPlan).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('must have the price in BRL', () => {
    render(<CurrentPlanBox plan={plan} onGoToCustomerPortalClick={() => {}} />);

    const price = screen.queryByText(/R\$ 5,44/i);

    expect(price).toBeInTheDocument();
  });

  it('if the plan is free, must not have a button to manage subscription', () => {
    render(
      <CurrentPlanBox plan={planFree} onGoToCustomerPortalClick={() => {}} />
    );

    const button = screen.queryByRole('button');

    expect(button).not.toBeInTheDocument();
  });

  it('if the plan is not free, must have a button to manage subscription', () => {
    render(<CurrentPlanBox plan={plan} onGoToCustomerPortalClick={() => {}} />);

    const button = screen.queryByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('click on the manage subscription button must call the onGoToCustomerPortalClick', async () => {
    const onGoToCustomerPortalClick = jest.fn();
    render(
      <CurrentPlanBox
        plan={plan}
        onGoToCustomerPortalClick={onGoToCustomerPortalClick}
      />
    );

    const button = screen.queryByRole('button');

    await act(async () => {
      await userEvent.click(button || new Element());
    });

    expect(onGoToCustomerPortalClick).toHaveBeenCalledTimes(1);
  });
});
