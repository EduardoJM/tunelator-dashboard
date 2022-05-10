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

    const plansButton = screen.getByText(/^Planos e Assinatura$/i);

    expect(plansButton).toBeInTheDocument();
    expect(plansButton.tagName.toUpperCase()).toEqual('BUTTON');
  });

  it('must contain informations about already paid problem on the page', () => {
    render(<AlreadyPaid />);

    const heading = screen.getByText(
      /^Você já possui uma assinatura paga...$/i
    );
    const body = screen.getByText(
      /^Atualmente só é possível alterar o plano da assinatura cancelando a assinatura e assinando uma nova. Estamos trabalhando para melhorar isso, porém, por enquanto, você pode ir na página de Planos e Assinaturas, em Gerenciar, e cancelar a atual e assinar uma nova.$/i
    );

    expect(heading).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it('click on the plans button must navigate to plans', async () => {
    render(<AlreadyPaid />);

    const plansButton = screen.getByText(/^Planos e Assinatura$/i);

    window.history.replaceState({}, '', '/any-route');

    expect(window.location.pathname).toEqual('/any-route');

    await act(async () => {
      await userEvent.click(plansButton);
    });

    expect(window.location.pathname).toEqual('/plans');
  });
});
