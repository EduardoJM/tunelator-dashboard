import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { LoadingIndicatorBox } from '@/components';
import { CurrentPlanBox } from '@/features';
import { usePlan } from '../../../contexts/plan';

interface CurrentPlanSectionProps {
  onGoToCustomerPortal: () => void;
}

const CurrentPlanSection: FC<CurrentPlanSectionProps> = ({
  onGoToCustomerPortal,
}) => {
  const { plan } = usePlan();

  return (
    <Box mt="60px" data-testid="current-plan-section">
      {!plan ? (
        <LoadingIndicatorBox />
      ) : (
        <CurrentPlanBox
          plan={plan}
          onGoToCustomerPortalClick={onGoToCustomerPortal}
        />
      )}
    </Box>
  );
};

export default CurrentPlanSection;
