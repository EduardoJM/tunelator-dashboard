import { UserMail, UserMailPaginatedResponse } from '../entities/UserMail';
import api from './api';

export async function getLatestMails(): Promise<UserMail[]> {
  const response = await api.get<UserMailPaginatedResponse>(
    '/api/mails/?limit=5'
  );
  return response.data.results;
}

export async function getMailsPaginated(
  page = 1
): Promise<UserMailPaginatedResponse> {
  const response = await api.get<UserMailPaginatedResponse>(
    `/api/mails/?offset=${5 * (page - 1)}&limit=5`
  );
  return response.data;
}

export async function setMailRedirectEnabled(
  id: number,
  enabled: boolean
): Promise<any> {
  const response = await api.patch(`/api/mails/${id}/`, {
    redirect_enabled: enabled,
  });
  return response.data;
}

export async function createMail(
  name: string,
  redirect_enabled: boolean
): Promise<any> {
  const response = await api.post('/api/mails/', { redirect_enabled, name });
  return response.data;
}

export async function updateMail(
  id: number,
  name: string,
  redirect_enabled: boolean
): Promise<any> {
  const response = await api.patch(`/api/mails/${id}/`, {
    redirect_enabled,
    name,
  });
  return response.data;
}
