import api from './axios';
import { CheckoutSession } from '../../entities/CheckoutSession';
import { CustomerPortalSession } from '../../entities/CustomerPortalSession';
import config from '../../config';

export async function createSession(plan_id: number): Promise<CheckoutSession> {
  const response = await api.post<CheckoutSession>('/payments/checkout/', {
    plan: plan_id,
  });
  return response.data;
}

export function goToCheckout(session: CheckoutSession) {
  const url = `${config.apiUrl}/payments/checkout/go/${session.checkout_id}/`;

  const form = document.createElement('form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', url);
  form.setAttribute('data-testid', 'go-to-checkout-helper-form');
  form.style.opacity = '0';

  document.body.appendChild(form);
  form.submit();
}

export async function createCustomerPortalSession(): Promise<CustomerPortalSession> {
  const response = await api.post<CustomerPortalSession>('/payments/manage/');
  return response.data;
}

export function goToCustomerPortal(session: CustomerPortalSession) {
  const url = `${config.apiUrl}/payments/manage/go/${session.manager_id}/`;

  const form = document.createElement('form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', url);
  form.setAttribute('data-testid', 'go-to-customer-portal-form');
  form.style.opacity = '0';

  document.body.appendChild(form);
  form.submit();
}
