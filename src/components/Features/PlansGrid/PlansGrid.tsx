import { FC } from 'react';
import { SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import { Plan } from '@/entities/Plan';
import PlanItem from '../PlanItem';

export interface PlansGridProps {
  plans: Plan[];
  selectedPlan: number | null;
  onSelectPlan: (planId: number) => void;
}

const PlansGrid: FC<PlansGridProps> = ({
  plans,
  selectedPlan,
  onSelectPlan,
}) => {
  const columns = useBreakpointValue({ base: 1, md: 3 });

  return (
    <SimpleGrid columns={columns} spacing="20px">
      {plans.map(plan => (
        <PlanItem
          plan={plan}
          selected={selectedPlan === plan.id}
          onSelect={() => onSelectPlan(plan.id)}
          key={plan.id}
        />
      ))}
    </SimpleGrid>
  );
};

export default PlansGrid;
