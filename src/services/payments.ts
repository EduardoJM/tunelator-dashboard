import api from './api';
import {
  CheckoutSession,
  CheckoutCSRFToken,
} from '../entities/CheckoutSession';

export async function createSession(plan_id: number): Promise<CheckoutSession> {
  const response = await api.post<CheckoutSession>('/api/payments/checkout/', {
    plan: plan_id,
  });
  return response.data;
}

export async function createCSRFToken(): Promise<CheckoutCSRFToken> {
  const response = await api.post<CheckoutCSRFToken>('/api/payments/token/');
  return response.data;
}

export function goToCheckout(session: CheckoutSession) {
  const url = `https://api.tunelator.com.br/api/payments/checkout/go/${session.checkout_id}/`;

  const form = document.createElement('form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', url);
  form.style.opacity = '0';

  document.body.appendChild(form);
  form.submit();
}
