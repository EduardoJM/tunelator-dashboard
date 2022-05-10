import { ReactElement } from 'react';
import { render as renderDefault, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Canceled from './Canceled';

const render = (el: ReactElement) =>
  renderDefault(el, { wrapper: BrowserRouter });

describe('Success', () => {
  it('must contains two buttons, one to home and one to support, in the page', () => {
    render(<Canceled />);

    const plansButton = screen.getByText(/^Planos e Assinatura$/i);
    const supportButton = screen.getByText(/^Falar com o Suporte$/i);

    expect(plansButton).toBeInTheDocument();
    expect(plansButton.tagName.toUpperCase()).toEqual('BUTTON');
    expect(supportButton).toBeInTheDocument();
    expect(supportButton.tagName.toUpperCase()).toEqual('BUTTON');
  });

  it('must contain informations about payment canceled on the page', () => {
    render(<Canceled />);

    const heading = screen.getByText(/^Não desista da sua privacidade...$/i);
    const body = screen.getByText(
      /^Vimos que sua seção no carrinho de compras foi cancelada, gostariamos de saber se você precisa de ajuda para se decidir\? Fale com o nosso suporte...$/i
    );

    expect(heading).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it('click on the plans button must navigate to plans', async () => {
    render(<Canceled />);

    const plansButton = screen.getByText(/^Planos e Assinatura$/i);

    window.history.replaceState({}, '', '/any-route');

    expect(window.location.pathname).toEqual('/any-route');

    await act(async () => {
      await userEvent.click(plansButton);
    });

    expect(window.location.pathname).toEqual('/plans');
  });

  it('click on the support button must navigate to support', async () => {
    render(<Canceled />);

    const supportButton = screen.getByText(/^Falar com o Suporte$/i);

    window.history.replaceState({}, '', '/any-route');

    expect(window.location.pathname).toEqual('/any-route');

    await act(async () => {
      await userEvent.click(supportButton);
    });

    expect(window.location.pathname).toEqual('/support');
  });
});
