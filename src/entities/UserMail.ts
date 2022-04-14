export interface UserMail {
  created_at: string;
  mail: string;
  name: string;
  plan_enabled: boolean;
  redirect_enabled: boolean;
  updated_at: string;
}

export interface UserMailPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserMail[];
}
