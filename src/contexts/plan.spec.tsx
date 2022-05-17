import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { AuthProvider } from './auth';
import { PlanProvider, usePlan } from './plan';
import { LoadingProvider } from './loading';
import { server } from '../mocks/server';
import { activePlan } from '../mocks/fixtures';
import { ActivePlan } from '../entities/Plan';
import config from '../config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
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

describe('contexts/plan', () => {
  it('should plan must be null if the user is not authenticated', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePlan(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.plan).toBeNull();
  });

  it('should plan must not be null if has loggedin user and the plan was get from the api', async () => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    const { result, waitFor } = renderHook(() => usePlan(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.plan).not.toBeNull();
    });
  });

  it('should plan contains the informations gots from the api', async () => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    server.use(
      rest.get(`${config.apiUrl}/plans/active/`, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json(activePlan));
      })
    );

    const { result, waitFor } = renderHook(() => usePlan(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.plan).not.toBeNull();
    });

    const plan = new ActivePlan(activePlan);

    expect(result.current.plan?.mails).toEqual(plan.mails);
    expect(result.current.plan?.allow_custom_redirect).toEqual(
      plan.allow_custom_redirect
    );
    expect(result.current.plan?.allow_resend_mails).toEqual(
      plan.allow_resend_mails
    );
    expect(result.current.plan?.days_until_user_can_delete_account).toEqual(
      plan.days_until_user_can_delete_account
    );
  });
});
