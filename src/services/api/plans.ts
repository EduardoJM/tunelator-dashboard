import api from './axios';
import { Plan, ActivePlan, ActivePlanResponse } from '../../entities/Plan';

export async function listPlans(): Promise<Plan[]> {
  const response = await api.get<Plan[]>('/plans/');
  return response.data;
}

export async function getCurrentPlan(): Promise<ActivePlan> {
  const response = await api.get<ActivePlanResponse>('/plans/active/');
  return new ActivePlan(response.data);
}
