import {
  SocialContent,
  SocialContentPaginatedResponse,
} from '@/entities/SocialContent';
import api from './axios';

export async function getLatestSocialContents(): Promise<SocialContent[]> {
  await new Promise(resolve => setTimeout(resolve, 5000));

  const response = await api.get<SocialContentPaginatedResponse>(
    '/content/?limit=8'
  );
  return response.data.results;
}
