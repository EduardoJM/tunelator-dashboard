import { FC } from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { AuthProvider } from '../../contexts/auth';
import { PlanProvider } from '../../contexts/plan';
import { LoadingProvider } from '../../contexts/loading';
import { activePlan } from '../../mocks/fixtures';
import { server } from '../../mocks/server';
import { PlanType } from '../../entities/Plan';
import Plans from './Plans';
import config from '../../config';

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

describe('Plans', () => {
  it('should contains an CurrentPlanSection', () => {
    render(<Plans />, { wrapper });

    expect(screen.queryByTestId('current-plan-section')).toBeInTheDocument();
  });
});
