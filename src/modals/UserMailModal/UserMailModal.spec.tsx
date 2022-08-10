import { screen, act, fireEvent } from '@testing-library/react';
import { render } from '@/mocks/contexts/wrapper';
import { waitAbsoluteLoader } from '@/test/utils/loaders';
import { accounts } from '../../mocks/fixtures';
import UserMailModal from './UserMailModal';
import { waitForAlertInScreen } from '@/test/utils/alerts';
import { mockOnce } from '@/mocks/server';

describe('UserMailModal', () => {
  it('should not render an alertdialog if isOpen is false', async () => {
    render(<UserMailModal isOpen={false} userMail={null} onClose={() => {}} />);

    await waitAbsoluteLoader();

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('should render an alertdialog if isOpen is true', async () => {
    render(<UserMailModal isOpen={true} userMail={null} onClose={() => {}} />);

    await waitAbsoluteLoader();

    expect(screen.queryByRole('alertdialog')).toBeInTheDocument();
  });

  it('should have an creation title if userMail is parsed as null', async () => {
    render(<UserMailModal isOpen={true} userMail={null} onClose={() => {}} />);

    await waitAbsoluteLoader();

    const title = screen.queryByTestId('modal-title');
    expect(title).toBeInTheDocument();
    expect(title?.innerHTML?.includes('createaccount')).toBeTruthy();
  });

  it('should have an update title if userMail is parsed as valid', async () => {
    const userMail = accounts.results[0];
    render(
      <UserMailModal isOpen={true} userMail={userMail} onClose={() => {}} />
    );

    await waitAbsoluteLoader();

    const title = screen.queryByTestId('modal-title');
    expect(title).toBeInTheDocument();
    expect(title?.innerHTML?.includes('editaccount')).toBeTruthy();
  });

  it('should contains valid form inputs', async () => {
    render(<UserMailModal isOpen={true} userMail={null} onClose={() => {}} />);

    await waitAbsoluteLoader();

    expect(screen.queryByTestId('account-name-input')).toBeInTheDocument();
    expect(screen.queryByTestId('account-user-input')).toBeInTheDocument();
    expect(
      screen.queryByTestId('account-redirect-enabled')
    ).toBeInTheDocument();
  });

  it('should the account user input must not disabled and the helper text not rendered if the userMail is null', async () => {
    render(<UserMailModal isOpen={true} userMail={null} onClose={() => {}} />);

    await waitAbsoluteLoader();

    const input = screen.getByTestId('account-user-input');
    expect(input).not.toBeDisabled();

    expect(screen.queryByText(/editaccount.noedit$/i)).not.toBeInTheDocument();
  });

  it('should the account user input must disabled and the helper text rendered if the userMail is not null', async () => {
    const [userMail] = accounts.results;
    render(
      <UserMailModal isOpen={true} userMail={userMail} onClose={() => {}} />
    );

    await waitAbsoluteLoader();

    const input = screen.getByTestId('account-user-input');
    expect(input).toBeDisabled();

    expect(screen.queryByText(/editaccount.noedit$/i)).toBeInTheDocument();
  });

  it('should show an alert in toast if the validate user mail name returns error', async () => {
    mockOnce('post', '/mails/verify/user/', 400, {});

    render(<UserMailModal isOpen={true} userMail={null} onClose={() => {}} />);

    await waitAbsoluteLoader();

    const input = screen.getByTestId('account-user-input');

    await act(async () => {
      fireEvent.blur(input);
    });

    const { description } = await waitForAlertInScreen();

    expect(description).toEqual('modals.createaccount.errordesc');
  });
});
