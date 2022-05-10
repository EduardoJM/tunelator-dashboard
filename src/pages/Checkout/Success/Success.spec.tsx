import { ReactElement } from 'react';
import { render as renderDefault, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Success from './Success';

const render = (el: ReactElement) =>
  renderDefault(el, { wrapper: BrowserRouter });

describe('Success', () => {
  it('must contains the two buttons, to home and to plans, in the page', () => {
    render(<Success />);

    const homeButton = screen.getByText(/^Início$/i);
    const plansButton = screen.getByText(/^Planos e Assinatura$/i);

    expect(homeButton).toBeInTheDocument();
    expect(homeButton.tagName.toUpperCase()).toEqual('BUTTON');
    expect(plansButton).toBeInTheDocument();
    expect(plansButton.tagName.toUpperCase()).toEqual('BUTTON');
  });

  it('must contain informations about payment on the page', () => {
    render(<Success />);

    const heading = screen.getByText(/^Pagamento efetuado$/i);
    const body = screen.getByText(
      /^Você pode conferir se o seu pagamento já foi processado em Planos e Assinaturas, bem como pode conferir isso no nosso painel.$/i
    );

    expect(heading).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it('click on the home button must navigate to home', async () => {
    render(<Success />);

    const homeButton = screen.getByText(/^Início$/i);

    window.history.replaceState({}, '', '/any-route');

    expect(window.location.pathname).toEqual('/any-route');

    await act(async () => {
      await userEvent.click(homeButton);
    });

    expect(window.location.pathname).toEqual('/');
  });

  it('click on the plans button must navigate to plans', async () => {
    render(<Success />);

    const plansButton = screen.getByText(/^Planos e Assinatura$/i);

    window.history.replaceState({}, '', '/any-route');

    expect(window.location.pathname).toEqual('/any-route');

    await act(async () => {
      await userEvent.click(plansButton);
    });

    expect(window.location.pathname).toEqual('/plans');
  });
});
