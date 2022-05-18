import { FC } from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { AuthProvider } from '../../contexts/auth';
import { PlanProvider } from '../../contexts/plan';
import { LoadingProvider } from '../../contexts/loading';
import { activePlan, plans } from '../../mocks/fixtures';
import { server } from '../../mocks/server';
import { PlanType } from '../../entities/Plan';
import Plans from './Plans';
import config from '../../config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

const wrapper: FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <LoadingProvider>
      <BrowserRouter>
        <AuthProvider>
          <PlanProvider>{children}</PlanProvider>
        </AuthProvider>
      </BrowserRouter>
    </LoadingProvider>
  </QueryClientProvider>
);

describe('Plans', () => {
  it('should contains an CurrentPlanSection', () => {
    render(<Plans />, { wrapper });

    expect(screen.queryByTestId('current-plan-section')).toBeInTheDocument();
  });

  it('should show the already-paid message when the plan is non-free', async () => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    const myActivePlan = {
      ...activePlan,
      plan_type: PlanType.Paid,
    };
    server.use(
      rest.get(`${config.apiUrl}/plans/active/`, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json(myActivePlan));
      })
    );

    render(<Plans />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(0);
    });

    expect(screen.queryByTestId('already-paid-section')).toBeInTheDocument();
  });

  it('should show an loading indicator when is fetching the plans from the api', async () => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    const apiCallback = jest.fn();

    const myActivePlan = {
      ...activePlan,
      plan_type: PlanType.Free,
    };
    server.use(
      rest.get(`${config.apiUrl}/plans/active/`, (req, res, ctx) => {
        apiCallback();
        return res.once(ctx.status(200), ctx.json(myActivePlan));
      }),
      rest.get(`${config.apiUrl}/plans`, async (req, res, ctx) => {
        await waitFor(() => {
          expect(apiCallback).toHaveBeenCalledTimes(1);
        });
        return res(ctx.status(200), ctx.json(plans));
      })
    );

    render(<Plans />, { wrapper });

    expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(1);
    await waitFor(() => {
      expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(0);
    });
  });

  it('should show an plans grid when the plan is free', async () => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    const myActivePlan = {
      ...activePlan,
      plan_type: PlanType.Free,
    };
    server.use(
      rest.get(`${config.apiUrl}/plans/active/`, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json(myActivePlan));
      })
    );

    render(<Plans />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(0);
    });

    expect(screen.queryByText(/^Assinar um plano$/i)).toBeInTheDocument();
    expect(screen.queryAllByTestId('plan-item')).toHaveLength(plans.length);
    expect(screen.queryByTestId('go-to-checkout-button')).toBeInTheDocument();
  });

  it('should the go to checkout button initial state must be disabled', async () => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    const myActivePlan = {
      ...activePlan,
      plan_type: PlanType.Free,
    };
    server.use(
      rest.get(`${config.apiUrl}/plans/active/`, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json(myActivePlan));
      })
    );

    render(<Plans />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(0);
    });

    const button = screen.getByTestId('go-to-checkout-button');
    expect(button).toBeDisabled();
  });

  it('should enable the go to checkout button when we click on select on an plan item', async () => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    const myActivePlan = {
      ...activePlan,
      plan_type: PlanType.Free,
    };
    server.use(
      rest.get(`${config.apiUrl}/plans/active/`, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json(myActivePlan));
      })
    );

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
    const apiCallback = jest.fn();

    const myActivePlan = {
      ...activePlan,
      plan_type: PlanType.Free,
    };
    server.use(
      rest.get(`${config.apiUrl}/plans/active/`, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json(myActivePlan));
      }),
      rest.post(`${config.apiUrl}/payments/checkout/`, (req, res, ctx) => {
        apiCallback();
        return res.once(ctx.status(201), ctx.json({ checkout_id }));
      })
    );

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

    const myActivePlan = {
      ...activePlan,
      plan_type: PlanType.Paid,
    };
    const manager_id = '1234656565';
    const apiCallback = jest.fn();

    server.use(
      rest.get(`${config.apiUrl}/plans/active/`, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json(myActivePlan));
      }),
      rest.post(`${config.apiUrl}/payments/manage/`, (req, res, ctx) => {
        apiCallback();
        return res.once(ctx.status(201), ctx.json({ manager_id }));
      })
    );

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
