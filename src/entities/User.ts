export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  last_login: string;
}

export interface UserUpdate {
  first_name?: string;
  last_name?: string;
  password?: string;
}

export interface AuthResponse {
  refresh: string;
  access: string;
  user: User;
}

export interface AuthRefreshResponse {
  access: string;
  user: User;
}
