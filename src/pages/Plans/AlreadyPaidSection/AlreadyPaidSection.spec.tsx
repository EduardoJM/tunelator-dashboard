import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AlreadyPaidSection from './AlreadyPaidSection';

describe('AlreadyPaidSection', () => {
  it('should contains an heading', () => {
    render(<AlreadyPaidSection onGoToCustomerPortal={() => {}} />);

    expect(screen.queryByRole('heading')).toBeInTheDocument();
  });

  it('should contains an paragraph with the description of the information', () => {
    render(<AlreadyPaidSection onGoToCustomerPortal={() => {}} />);

    expect(screen.queryByTestId('description')).toBeInTheDocument();
  });

  it('should contains an button to go to the customer portal', () => {
    render(<AlreadyPaidSection onGoToCustomerPortal={() => {}} />);

    expect(screen.queryByRole('button')).toBeInTheDocument();
  });

  it('should call onGoToCustomerPortal when click in the button to go to the customer portal', async () => {
    const onGoToCustomerPortal = jest.fn();

    render(<AlreadyPaidSection onGoToCustomerPortal={onGoToCustomerPortal} />);

    const button = screen.getByRole('button');

    await act(async () => {
      await userEvent.click(button);
    });

    expect(onGoToCustomerPortal).toHaveBeenCalledTimes(1);
  });
});
