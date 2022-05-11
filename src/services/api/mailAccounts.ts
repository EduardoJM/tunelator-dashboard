import { UserMail, UserMailPaginatedResponse } from '../../entities/UserMail';
import api from './axios';

export async function getLatestMailAccounts(): Promise<UserMail[]> {
  const response = await api.get<UserMailPaginatedResponse>(
    '/api/mails/accounts/?limit=5'
  );
  return response.data.results;
}

export async function getMailAccountById(id: number): Promise<UserMail> {
  const response = await api.get<UserMail>(`/api/mails/accounts/${id}/`);
  return response.data;
}

export async function getMailAccountsPaginated(
  page = 1
): Promise<UserMailPaginatedResponse> {
  const response = await api.get<UserMailPaginatedResponse>(
    `/api/mails/accounts/?offset=${5 * (page - 1)}&limit=5`
  );
  return response.data;
}

export async function setMailAccountRedirectEnabled(
  id: number,
  enabled: boolean
): Promise<any> {
  const response = await api.patch(`/api/mails/accounts/${id}/`, {
    redirect_enabled: enabled,
  });
  return response.data;
}

export async function createMailAccount(
  name: string,
  mail_user: string,
  redirect_enabled: boolean,
  redirect_to: string | null
): Promise<any> {
  const response = await api.post('/api/mails/accounts/', {
    redirect_enabled,
    mail_user,
    name,
    redirect_to,
  });
  return response.data;
}

export async function updateMailAccount(
  id: number,
  name: string,
  redirect_enabled: boolean,
  redirect_to: string | null
): Promise<any> {
  const response = await api.patch(`/api/mails/accounts/${id}/`, {
    redirect_enabled,
    name,
    redirect_to,
  });
  return response.data;
}

export async function validateUserMailAccount(
  user_name: string
): Promise<boolean> {
  try {
    await api.post('/api/mails/verify/user/', { user_name });
    return true;
  } catch {
    return false;
  }
}

export async function deleteMailAccount(id: number): Promise<any> {
  const response = await api.delete(`/api/mails/accounts/${id}/`);
  return response.data;
}
