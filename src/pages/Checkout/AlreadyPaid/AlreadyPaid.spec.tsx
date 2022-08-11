import { ReactElement } from 'react';
import { render as renderDefault, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import AlreadyPaid from './AlreadyPaid';

const render = (el: ReactElement) =>
  renderDefault(el, { wrapper: BrowserRouter });

describe('Success', () => {
  it('must contains one button to plans in the page', () => {
    render(<AlreadyPaid />);

    const plansButton = screen.getByTestId('plans-button');

    expect(plansButton).toBeInTheDocument();
    expect(plansButton.tagName.toUpperCase()).toEqual('BUTTON');
  });

  it('must contain informations about already paid problem on the page', () => {
    render(<AlreadyPaid />);

    const heading = screen.getByText(/^checkout\.alreadypaid\.title$/i);
    const body = screen.getByText(/^checkout\.alreadypaid\.body$/i);

    expect(heading).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it('click on the plans button must navigate to plans', async () => {
    render(<AlreadyPaid />);

    const plansButton = screen.getByTestId('plans-button');

    window.history.replaceState({}, '', '/any-route');

    expect(window.location.pathname).toEqual('/any-route');

    await act(async () => {
      await userEvent.click(plansButton);
    });

    expect(window.location.pathname).toEqual('/plans');
  });
});
