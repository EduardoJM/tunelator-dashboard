import api from './api';
import { Plan, ActivePlan, ActivePlanResponse } from '../entities/Plan';

export async function listPlans(): Promise<Plan[]> {
  const response = await api.get<Plan[]>('/api/plans/');
  return response.data;
}

export async function getCurrentPlan(): Promise<ActivePlan> {
  const response = await api.get<ActivePlanResponse>('/api/plans/active/');
  return new ActivePlan(response.data);
}
