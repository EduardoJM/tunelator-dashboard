import {
  ReceivedMail,
  ReceivedMailPaginatedResponse,
} from '../entities/ReceivedMail';
import api from './api';

export async function getLatestReceivedMails(): Promise<ReceivedMail[]> {
  const response = await api.get<ReceivedMailPaginatedResponse>(
    '/api/mails/received/?limit=5'
  );
  return response.data.results;
}

export async function getReceivedMailsPaginated(
  page: number
): Promise<ReceivedMailPaginatedResponse> {
  const response = await api.get<ReceivedMailPaginatedResponse>(
    `/api/mails/received/?offset=${10 * (page - 1)}&limit=10`
  );
  return response.data;
}
