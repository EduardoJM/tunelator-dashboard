import {
  SocialContent,
  SocialContentPaginatedResponse,
} from '@/entities/SocialContent';
import api from './axios';

export async function getLatestSocialContents(): Promise<SocialContent[]> {
  const response = await api.get<SocialContentPaginatedResponse>(
    '/content/?limit=8'
  );
  return response.data.results;
}
