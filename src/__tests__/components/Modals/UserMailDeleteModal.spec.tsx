import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserMailDeleteModal } from '@/components/Modals';
import accountFactory from '@/__mocks__/factories/account';

describe('UserMailDeleteModal', () => {
  it('should not render an alertdialog if isOpen is false', () => {
    render(
      <UserMailDeleteModal
        isOpen={false}
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    );

    const dialog = screen.queryByRole('alertdialog');

    expect(dialog).not.toBeInTheDocument();
  });

  it('should render an alertdialog if isOpen is true', async () => {
    render(
      <UserMailDeleteModal
        isOpen={true}
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    );

    const dialog = screen.queryByRole('alertdialog');

    expect(dialog).toBeInTheDocument();
  });

  it('should have an valid title', () => {
    render(
      <UserMailDeleteModal
        isOpen={true}
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    );

    const header = screen.getByTestId('modal-title');

    expect(header).toBeInTheDocument();
  });

  it('should have an cancel and an confirm button', () => {
    render(
      <UserMailDeleteModal
        isOpen={true}
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    );

    const cancelButton = screen.getByTestId('cancel-button');
    const confirmButton = screen.getByTestId('confirm-button');

    expect(cancelButton).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
  });

  it('should call onCancel when click on the cancel button', async () => {
    const onCancel = jest.fn();
    render(
      <UserMailDeleteModal
        isOpen={true}
        onCancel={onCancel}
        onConfirm={() => {}}
      />
    );

    const cancelButton = screen.getByTestId('cancel-button');

    await act(async () => {
      await userEvent.click(cancelButton);
    });

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should call onConfirm when click on the confirm button', async () => {
    const onConfirm = jest.fn();
    render(
      <UserMailDeleteModal
        isOpen={true}
        onConfirm={onConfirm}
        onCancel={() => {}}
      />
    );

    const confirmButton = screen.getByTestId('confirm-button');

    await act(async () => {
      await userEvent.click(confirmButton);
    });

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should shown the account name on the modal if account is parsed', async () => {
    const account = accountFactory();
    render(
      <UserMailDeleteModal
        isOpen={true}
        onCancel={() => {}}
        onConfirm={() => {}}
        account={account}
      />
    );

    const name = screen.queryByText(new RegExp(`^${account.name}$`));
    expect(name).toBeInTheDocument();
  });
});
