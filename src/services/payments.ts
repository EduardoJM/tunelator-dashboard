import api from './api';
import { CheckoutSession } from '../entities/CheckoutSession';
import { CustomerPortalSession } from '../entities/CustomerPortalSession';

export async function createSession(plan_id: number): Promise<CheckoutSession> {
  const response = await api.post<CheckoutSession>('/api/payments/checkout/', {
    plan: plan_id,
  });
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

export async function createCustomerPortalSession(): Promise<CustomerPortalSession> {
  const response = await api.post<CustomerPortalSession>(
    '/api/payments/manage/'
  );
  return response.data;
}

export function goToCustomerPortal(session: CustomerPortalSession) {
  const url = `https://api.tunelator.com.br/api/payments/manage/go/${session.manager_id}/`;

  const form = document.createElement('form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', url);
  form.style.opacity = '0';

  document.body.appendChild(form);
  form.submit();
}
