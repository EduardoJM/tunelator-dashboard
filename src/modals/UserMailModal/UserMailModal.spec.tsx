import { FC } from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { AuthProvider } from '../../contexts/auth';
import { PlanProvider } from '../../contexts/plan';
import { LoadingProvider } from '../../contexts/loading';
import { activePlan, plans, accounts } from '../../mocks/fixtures';
import { server } from '../../mocks/server';
import { PlanType } from '../../entities/Plan';
import UserMailModal from './UserMailModal';
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

describe('UserMailModal', () => {
  it('should not render an alertdialog if isOpen is false', async () => {
    render(
      <UserMailModal isOpen={false} userMail={null} onClose={() => {}} />,
      {
        wrapper,
      }
    );

    await waitFor(() => {
      expect(
        screen.queryByTestId('absolute-loading-overlay')
      ).not.toBeInTheDocument();
    });

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('should render an alertdialog if isOpen is true', async () => {
    render(<UserMailModal isOpen={true} userMail={null} onClose={() => {}} />, {
      wrapper,
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId('absolute-loading-overlay')
      ).not.toBeInTheDocument();
    });

    expect(screen.queryByRole('alertdialog')).toBeInTheDocument();
  });

  it('should have an creation title if userMail is parsed as null', async () => {
    render(<UserMailModal isOpen={true} userMail={null} onClose={() => {}} />, {
      wrapper,
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId('absolute-loading-overlay')
      ).not.toBeInTheDocument();
    });

    expect(screen.queryByText(/^Criar Conta de E-mail$/i)).toBeInTheDocument();
  });

  it('should have an update title if userMail is parsed as valid', async () => {
    const userMail = accounts.results[0];
    render(
      <UserMailModal isOpen={true} userMail={userMail} onClose={() => {}} />,
      {
        wrapper,
      }
    );

    await waitFor(() => {
      expect(
        screen.queryByTestId('absolute-loading-overlay')
      ).not.toBeInTheDocument();
    });

    expect(screen.queryByText(/^Editar Conta de E-mail$/i)).toBeInTheDocument();
  });
});
