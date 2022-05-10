import { ReactElement } from 'react';
import { render as renderDefault, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Error from './Error';

const render = (el: ReactElement) =>
  renderDefault(el, { wrapper: BrowserRouter });

describe('Success', () => {
  it('must contains one button to plans in the page', () => {
    render(<Error />);

    const plansButton = screen.getByText(/^Planos e Assinatura$/i);

    expect(plansButton).toBeInTheDocument();
    expect(plansButton.tagName.toUpperCase()).toEqual('BUTTON');
  });

  it('must contain informations about payment error on the page', () => {
    render(<Error />);

    const heading1 = screen.getByText(
      /^Houve um erro ao tentar te encaminhar para o processamento de pagamento...$/i
    );
    const heading2 = screen.getByText(
      /^Tente novamente mais tarde e caso o erro persista, entre em contato com o suporte.$/i
    );

    expect(heading1).toBeInTheDocument();
    expect(heading2).toBeInTheDocument();
  });

  it('click on the plans button must navigate to plans', async () => {
    render(<Error />);

    const plansButton = screen.getByText(/^Planos e Assinatura$/i);

    window.history.replaceState({}, '', '/any-route');

    expect(window.location.pathname).toEqual('/any-route');

    await act(async () => {
      await userEvent.click(plansButton);
    });

    expect(window.location.pathname).toEqual('/plans');
  });
});
