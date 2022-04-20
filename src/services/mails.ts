import { ReceivedMail } from '../entities/ReceivedMail';
import { UserMail, UserMailPaginatedResponse } from '../entities/UserMail';
import api from './api';

export async function getLatestMails(): Promise<UserMail[]> {
  const response = await api.get<UserMailPaginatedResponse>(
    '/api/mails/accounts/?limit=5'
  );
  return response.data.results;
}

export async function getMailsPaginated(
  page = 1
): Promise<UserMailPaginatedResponse> {
  const response = await api.get<UserMailPaginatedResponse>(
    `/api/mails/accounts/?offset=${5 * (page - 1)}&limit=5`
  );
  return response.data;
}

export async function setMailRedirectEnabled(
  id: number,
  enabled: boolean
): Promise<any> {
  const response = await api.patch(`/api/mails/accounts/${id}/`, {
    redirect_enabled: enabled,
  });
  return response.data;
}

export async function createMail(
  name: string,
  mail_user: string,
  redirect_enabled: boolean
): Promise<any> {
  const response = await api.post('/api/mails/accounts/', {
    redirect_enabled,
    mail_user,
    name,
  });
  return response.data;
}

export async function validateUserMail(user_name: string): Promise<boolean> {
  try {
    await api.post('/api/mails/verify/user/', { user_name });
    return true;
  } catch {
    return false;
  }
}

export async function updateMail(
  id: number,
  name: string,
  redirect_enabled: boolean
): Promise<any> {
  const response = await api.patch(`/api/mails/accounts/${id}/`, {
    redirect_enabled,
    name,
  });
  return response.data;
}

export async function getLatestReceivedMails(): Promise<ReceivedMail[]> {
  const response = await api.get<ReceivedMail[]>(
    '/api/mails/received/?limit=5'
  );
  return response.data;
}
