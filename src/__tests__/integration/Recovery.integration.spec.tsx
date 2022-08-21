import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queryClient } from '@/__mocks__/queryClient';
import { mockOnce } from '@/__mocks__/server';
import { waitAbsoluteLoader, waitForAlertInScreen } from '@/utils/tests';
import App from '@/App';

describe('RecoveryPassword', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.history.replaceState({}, '', '/recovery');
  });

  it('should contains an form, an e-mail input and a submit button', async () => {
    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

    expect(screen.queryByRole('form')).toBeInTheDocument();
    expect(screen.queryByTestId('email-field')).toBeInTheDocument();
    expect(screen.queryByTestId('submit-button')).toBeInTheDocument();
  });

  it('should call the api and show an alert in the screen when type the e-mail and click on the send button', async () => {
    const apiCallback = mockOnce('post', '/auth/recovery/', 200, {});

    render(<App queryClient={queryClient} />);

    await waitAbsoluteLoader();

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
