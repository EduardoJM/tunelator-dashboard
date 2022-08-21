import { createContext, useContext, FC, useState, useEffect } from 'react';
import { ActivePlan } from '@/entities/Plan';
import { getCurrentPlan } from '@/services/api/plans';
import { useAuth } from './auth';
import { useLoading } from './loading';

export interface PlanContextData {
  plan: ActivePlan | null;
}

export const PlanContext = createContext<PlanContextData>(
  {} as PlanContextData
);

export const PlanProvider: FC = ({ children }) => {
  const { loggedIn } = useAuth();
  const [plan, setPlan] = useState<ActivePlan | null>(null);
  const { pushLoading, popLoading } = useLoading();

  useEffect(() => {
    async function updatePlan() {
      pushLoading();

      if (!loggedIn) {
        setPlan(null);
        popLoading();
        return;
      }

      try {
        const plan = await getCurrentPlan();
        setPlan(plan);
      } catch {
        setPlan(null);
      } finally {
        popLoading();
      }
    }

    updatePlan();
  }, [loggedIn]);

  return (
    <PlanContext.Provider value={{ plan }}>{children}</PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);
