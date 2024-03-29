import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResendMailSuccessModal } from '@/components/Modals';

describe('TermsOfUseModal', () => {
  it('must not render an alertdialog if isOpen is false', () => {
    render(<ResendMailSuccessModal isOpen={false} onClose={() => {}} />);

    const dialog = screen.queryByRole('alertdialog');

    expect(dialog).not.toBeInTheDocument();
  });

  it('must render an alertdialog if isOpen is true', async () => {
    render(<ResendMailSuccessModal isOpen={true} onClose={() => {}} />);

    const dialog = screen.queryByRole('alertdialog');

    expect(dialog).toBeInTheDocument();
  });

  it('must have an valid title', () => {
    render(<ResendMailSuccessModal isOpen={true} onClose={() => {}} />);

    const header = screen.queryByTestId('dialog-title');

    expect(header).toBeInTheDocument();
  });

  it('must have an close button', () => {
    render(<ResendMailSuccessModal isOpen={true} onClose={() => {}} />);

    const closeButton = screen.queryByTestId(/^close-button$/i);

    expect(closeButton).toBeInTheDocument();
  });

  it('must call onClose when click on the close button', async () => {
    const onClose = jest.fn();
    render(<ResendMailSuccessModal isOpen={true} onClose={onClose} />);

    const closeButton = screen.getByTestId(/^close-button$/i);

    await act(async () => {
      await userEvent.click(closeButton);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
