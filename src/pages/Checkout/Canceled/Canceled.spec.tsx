import { ReactElement } from 'react';
import { render as renderDefault, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Canceled from './Canceled';

const render = (el: ReactElement) =>
  renderDefault(el, { wrapper: BrowserRouter });

describe('Success', () => {
  it('must contains two buttons, one to plans and one to support, in the page', () => {
    render(<Canceled />);

    const plansButton = screen.getByTestId('plans-button');
    const supportButton = screen.getByTestId('support-button');

    expect(plansButton).toBeInTheDocument();
    expect(plansButton.tagName.toUpperCase()).toEqual('BUTTON');
    expect(supportButton).toBeInTheDocument();
    expect(supportButton.tagName.toUpperCase()).toEqual('BUTTON');
  });

  it('must contain informations about payment canceled on the page', () => {
    render(<Canceled />);

    const heading = screen.getByText(/^checkout\.canceled\.title$/i);
    const body = screen.getByText(/^checkout\.canceled\.body$/i);

    expect(heading).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it('click on the plans button must navigate to plans', async () => {
    render(<Canceled />);

    const plansButton = screen.getByTestId('plans-button');

    window.history.replaceState({}, '', '/any-route');

    expect(window.location.pathname).toEqual('/any-route');

    await act(async () => {
      await userEvent.click(plansButton);
    });

    expect(window.location.pathname).toEqual('/plans');
  });

  it('click on the support button must navigate to support', async () => {
    render(<Canceled />);

    const supportButton = screen.getByTestId('support-button');

    window.history.replaceState({}, '', '/any-route');

    expect(window.location.pathname).toEqual('/any-route');

    await act(async () => {
      await userEvent.click(supportButton);
    });

    expect(window.location.pathname).toEqual('/support');
  });
});
