import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Plan, PlanType } from '@/entities/Plan';
import { PlansGrid } from '@/components/Features';

const plan1: Plan = {
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
};

const plan2 = { ...plan1, id: 13 };

const plan3 = { ...plan1, id: 14 };

const plans = [plan1, plan2, plan3];

describe('PlansGrid', () => {
  it('must render nothing plan item if empty array is parsed', () => {
    render(
      <PlansGrid plans={[]} onSelectPlan={() => {}} selectedPlan={null} />
    );

    const items = screen.queryAllByTestId('plan-item');

    expect(items).toHaveLength(0);
  });

  it('must render one plan item for each plan in the parsed array', () => {
    render(
      <PlansGrid plans={plans} onSelectPlan={() => {}} selectedPlan={null} />
    );

    const items = screen.queryAllByTestId('plan-item');

    expect(items).toHaveLength(3);
  });

  it('click on the select button of an item must call onSelectPlan with the plan ID', async () => {
    const onSelectPlan = jest.fn();

    render(
      <PlansGrid
        plans={plans}
        onSelectPlan={onSelectPlan}
        selectedPlan={null}
      />
    );

    const items = Array.from(screen.queryAllByTestId('plan-item') || []);
    let index = 0;

    for (const item of items) {
      index += 1;

      const button = item.querySelector('button');

      await act(async () => {
        await userEvent.click(button || new Element());
      });

      const arrIndex = items.indexOf(item);
      expect(onSelectPlan).toHaveBeenCalledTimes(index);
      expect(onSelectPlan).toHaveBeenLastCalledWith(plans[arrIndex].id);
    }
  });
});
