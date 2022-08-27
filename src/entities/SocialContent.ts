export interface SocialContent {
  id: number;
  type: string;
  title: string;
  link: string;
  description?: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface SocialContentPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SocialContent[];
}
