import { FC } from 'react';
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
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

  it('should contains valid form inputs', async () => {
    render(<UserMailModal isOpen={true} userMail={null} onClose={() => {}} />, {
      wrapper,
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId('absolute-loading-overlay')
      ).not.toBeInTheDocument();
    });

    expect(screen.queryByTestId('account-name-input')).toBeInTheDocument();
    expect(screen.queryByTestId('account-user-input')).toBeInTheDocument();
    expect(
      screen.queryByTestId('account-redirect-enabled')
    ).toBeInTheDocument();
  });

  it('should the account user input must not disabled and the helper text not rendered if the userMail is null', async () => {
    render(<UserMailModal isOpen={true} userMail={null} onClose={() => {}} />, {
      wrapper,
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId('absolute-loading-overlay')
      ).not.toBeInTheDocument();
    });

    const input = screen.getByTestId('account-user-input');
    expect(input).not.toBeDisabled();

    expect(
      screen.queryByText(/^Não é possível editar o nome do e-mail.$/i)
    ).not.toBeInTheDocument();
  });

  it('should the account user input must disabled and the helper text rendered if the userMail is not null', async () => {
    const [userMail] = accounts.results;
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

    const input = screen.getByTestId('account-user-input');
    expect(input).toBeDisabled();

    expect(
      screen.queryByText(/^Não é possível editar o nome do e-mail.$/i)
    ).toBeInTheDocument();
  });

  it('should show an alert in toast if the validate user mail name returns error', async () => {
    server.use(
      rest.post(`${config.apiUrl}/mails/verify/user/`, (req, res, ctx) => {
        return res.once(ctx.status(400), ctx.json({}));
      })
    );

    render(<UserMailModal isOpen={true} userMail={null} onClose={() => {}} />, {
      wrapper,
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId('absolute-loading-overlay')
      ).not.toBeInTheDocument();
    });

    const input = screen.getByTestId('account-user-input');

    await act(async () => {
      fireEvent.blur(input);
    });

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument();
    });

    expect(
      screen.getAllByText(
        /^Esse nome de conta não está disponível, tente mudar um pouco\.$/i
      ).length
    ).toBeGreaterThan(0);
  });
});
