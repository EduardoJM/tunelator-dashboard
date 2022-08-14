import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { wrapper } from '@/mocks/contexts/wrapper';
import { server } from '@/mocks/server';
import { waitForAlertInScreen } from '@/test/utils/alerts';
import config from '@/config';
import RecoveryPassword from './RecoveryPassword';

describe('RecoveryPassword', () => {
  it('should contains an form, an e-mail input and a submit button', () => {
    render(<RecoveryPassword />, { wrapper });

    expect(screen.queryByRole('form')).toBeInTheDocument();
    expect(screen.queryByTestId('email-field')).toBeInTheDocument();
    expect(screen.queryByTestId('submit-button')).toBeInTheDocument();
  });

  it('type the e-mail and click on the send button must call the api and show an alert in the screen', async () => {
    const apiCallback = jest.fn();
    server.use(
      rest.post(`${config.apiUrl}/auth/recovery/`, (req, res, ctx) => {
        apiCallback();
        return res(ctx.status(200));
      })
    );

    render(<RecoveryPassword />, { wrapper });

    const email = screen.getByTestId('email-field');
    const button = screen.getByTestId('submit-button');

    await act(async () => {
      await userEvent.type(email, 'example@example.com');
      await userEvent.click(button);
    });

    await waitFor(() => {
      expect(apiCallback).toHaveBeenCalledTimes(1);
    });

    const { description } = await waitForAlertInScreen();

    expect(description).toEqual('alerts.recovery.message');
  });
});
