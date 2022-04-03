import api from './api';
import { AuthResponse, AuthRefreshResponse } from '../entities/User';

export async function login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/token/', { email, password });
    return response.data;
}

export async function refresh(refresh: string): Promise<AuthRefreshResponse> {
    const response = await api.post<AuthRefreshResponse>('/auth/token/refresh/', { refresh });
    return response.data;
}
