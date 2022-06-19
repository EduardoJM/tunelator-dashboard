import { FC } from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../../contexts/auth';
import { PlanProvider } from '../../contexts/plan';
import { LoadingProvider } from '../../contexts/loading';
import { activePlan, plans } from '../../mocks/fixtures';
import { server } from '../../mocks/server';
import { PlanType } from '../../entities/Plan';
import config from '../../config';
import MailAccounts from './MailAccounts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

const wrapper: FC = ({ children }) => (
  <ChakraProvider theme={config.theme}>
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <BrowserRouter>
          <AuthProvider>
            <PlanProvider>{children}</PlanProvider>
          </AuthProvider>
        </BrowserRouter>
      </LoadingProvider>
    </QueryClientProvider>
  </ChakraProvider>
);

describe('MailAccounts', () => {
  beforeEach(() => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
  });

  it('should render at least five cards with received mail accounts if has more than five', async () => {
    render(<MailAccounts />, { wrapper });

    await waitFor(() => {
      expect(
        screen.queryByRole('absolute-loading-overlay')
      ).not.toBeInTheDocument();
      expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(0);
    });

    const cards = screen.queryAllByTestId('mail-account-card');
    expect(cards).toHaveLength(5);
  });

  it('should render an create account button', async () => {
    render(<MailAccounts />, { wrapper });

    await waitFor(() => {
      expect(
        screen.queryByRole('absolute-loading-overlay')
      ).not.toBeInTheDocument();
      expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(0);
    });

    const button = screen.queryByTestId('create-new-account-button');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('if the plan has no more accounts free, create account button should rendered disabled', async () => {
    const myActivePlan = {
      ...activePlan,
      free_accounts: 0,
      plan_type: PlanType.Free,
    };
    server.use(
      rest.get(`${config.apiUrl}/plans/active/`, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json(myActivePlan));
      })
    );
    render(<MailAccounts />, { wrapper });

    await waitFor(() => {
      expect(
        screen.queryByRole('absolute-loading-overlay')
      ).not.toBeInTheDocument();
      expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(0);
    });

    const button = screen.queryByTestId('create-new-account-button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
