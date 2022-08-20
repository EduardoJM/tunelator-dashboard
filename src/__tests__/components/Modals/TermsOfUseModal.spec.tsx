import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TermsOfUseModal } from '@/components/Modals';

describe('TermsOfUseModal', () => {
  it('must not render an alertdialog if isOpen is false', () => {
    render(
      <TermsOfUseModal
        isOpen={false}
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    );

    const dialog = screen.queryByRole('alertdialog');

    expect(dialog).not.toBeInTheDocument();
  });

  it('must render an alertdialog if isOpen is true', async () => {
    render(
      <TermsOfUseModal isOpen={true} onCancel={() => {}} onConfirm={() => {}} />
    );

    const dialog = screen.queryByRole('alertdialog');

    expect(dialog).toBeInTheDocument();
  });

  it('must have two buttons, one to confirm accept terms and one to cancel', () => {
    render(
      <TermsOfUseModal isOpen={true} onCancel={() => {}} onConfirm={() => {}} />
    );

    const cancelButton = screen.queryByTestId('cancel-button');
    const acceptTermsButton = screen.queryByTestId('confirm-button');

    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton?.tagName.toUpperCase()).toEqual('BUTTON');
    expect(acceptTermsButton).toBeInTheDocument();
    expect(acceptTermsButton?.tagName.toUpperCase()).toEqual('BUTTON');
  });

  it('must have an valid Terms of Use title', () => {
    render(
      <TermsOfUseModal isOpen={true} onCancel={() => {}} onConfirm={() => {}} />
    );

    const header = screen.queryByTestId('modal-title');

    expect(header).toBeInTheDocument();
  });

  it('must onCancel called on click in the cancel button', async () => {
    const onCancel = jest.fn();

    render(
      <TermsOfUseModal isOpen={true} onCancel={onCancel} onConfirm={() => {}} />
    );

    const cancelButton = screen.getByTestId('cancel-button');

    await act(async () => {
      await userEvent.click(cancelButton);
    });

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('must onConfirm called on click in the confirm button', async () => {
    const onConfirm = jest.fn();

    render(
      <TermsOfUseModal
        isOpen={true}
        onCancel={() => {}}
        onConfirm={onConfirm}
      />
    );

    const acceptTermsButton = screen.getByTestId('confirm-button');

    await act(async () => {
      await userEvent.click(acceptTermsButton);
    });

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
