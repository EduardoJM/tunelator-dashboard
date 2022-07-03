import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { activePlan } from '../../mocks/fixtures';
import { server } from '../../mocks/server';
import { PlanType } from '../../entities/Plan';
import { waitLoaders } from '@/test/utils/loaders';
import { wrapper } from '@/mocks/contexts/wrapper';
import config from '../../config';
import MailAccounts from './MailAccounts';

describe('MailAccounts', () => {
  beforeEach(() => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
  });

  it('should render at least five cards with received mail accounts if has more than five', async () => {
    render(<MailAccounts />, { wrapper });

    await waitLoaders();

    const cards = screen.queryAllByTestId('mail-account-card');
    expect(cards).toHaveLength(5);
  });

  it('should render an create account button', async () => {
    render(<MailAccounts />, { wrapper });

    await waitLoaders();

    const button = screen.queryByTestId('create-new-account-button');
    expect(button).toBeInTheDocument();
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

    await waitLoaders();

    await waitFor(() => {
      expect(screen.queryByTestId('create-new-account-button')).toBeDisabled();
    });
  });
});
