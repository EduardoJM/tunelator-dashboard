import api from './axios';

export async function sendRecoveryEmail(email: string): Promise<void> {
  try {
    await api.post('/auth/recovery/', { email });
  } catch {}
}
