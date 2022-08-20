import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Plan, PlanType } from '@/entities/Plan';
import { PlanItem } from '@/components/Features';

const plan: Plan = {
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

describe('PlanItem', () => {
  it('must include the plan name and the description', () => {
    render(<PlanItem plan={plan} onSelect={() => {}} selected={false} />);

    const name = screen.queryByText(/^my plan$/i);
    const description = screen.queryByText(/^the description$/i);

    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('must include an list with the display features', () => {
    render(<PlanItem plan={plan} onSelect={() => {}} selected={false} />);

    const list = screen.queryByTestId('feature-list');

    expect(list).toBeInTheDocument();

    const items = Array.from(list?.querySelectorAll('li') || []);

    expect(items).toHaveLength(2);

    const texts = items?.map(item => item.textContent);
    expect(texts).toMatchObject(['First feature', 'Last feature']);
  });

  it('must include the price in BRL', () => {
    render(<PlanItem plan={plan} onSelect={() => {}} selected={false} />);

    const price = screen.queryByText(/R\$ 5,44/i);

    expect(price).toBeInTheDocument();
  });

  it('must include an button to select the plan', () => {
    render(<PlanItem plan={plan} onSelect={() => {}} selected={false} />);

    const button = screen.queryByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('when click in the button to select the plan the onSelect must be called', async () => {
    const onSelect = jest.fn();
    render(<PlanItem plan={plan} onSelect={onSelect} selected={false} />);

    const button = screen.queryByRole('button');

    await act(async () => {
      await userEvent.click(button || new Element());
    });

    expect(onSelect).toBeCalledTimes(1);
  });
});
