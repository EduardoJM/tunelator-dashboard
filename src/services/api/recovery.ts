import api from './axios';

export async function sendRecoveryEmail(email: string): Promise<void> {
  try {
    await api.post('/auth/recovery/', { email });
  } catch {}
}

export async function isSessionValid(id: string): Promise<boolean> {
  try {
    await api.get(`/auth/recovery/${id}/`);
    return true;
  } catch {
    return false;
  }
}

export async function resetPassword(
  id: string,
  password: string
): Promise<void> {
  await api.put(`/auth/recovery/${id}/`, { password });
}
