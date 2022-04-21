import api from './api';
import { Plan } from '../entities/Plan';

export async function listPlans(): Promise<Plan[]> {
  const response = await api.get<Plan[]>('/api/plans/');
  return response.data;
}
