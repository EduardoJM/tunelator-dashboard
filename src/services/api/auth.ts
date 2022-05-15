import api from './axios';
import {
  AuthResponse,
  AuthRefreshResponse,
  User,
  UserUpdate,
} from '../../entities/User';

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/token/', {
    email,
    password,
  });
  return response.data;
}

export async function refresh(refresh: string): Promise<AuthRefreshResponse> {
  const response = await api.post<AuthRefreshResponse>('/auth/token/refresh/', {
    refresh,
  });
  return response.data;
}

export async function signup(
  email: string,
  first_name: string,
  last_name: string,
  password: string
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/create/', {
    email,
    first_name,
    last_name,
    password,
  });
  return response.data;
}

export async function getUserData(): Promise<User> {
  const response = await api.get<User>('/auth/user/');
  return response.data;
}

export async function updateUserData(data: UserUpdate): Promise<User> {
  const response = await api.patch<User>('/auth/user/', data);
  return response.data;
}
