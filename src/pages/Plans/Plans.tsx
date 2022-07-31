import { FC, useState } from 'react';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import LoadingIndicatorBox from '../../components/Placeholders/LoadingIndicatorBox';
import { Button } from '../../components';
import { PlansGrid } from '@/features';
import CurrentPlanSection from './CurrentPlanSection';
import AlreadyPaidSection from './AlreadyPaidSection';
import { usePlan } from '../../contexts/plan';
import { useListPlans } from '../../services/queries';
import {
  useGoToCustomerPortalMutation,
  useGoToCheckoutMutation,
} from '../../services/mutations';

const Plans: FC = () => {
  const { plan } = usePlan();
  const { data, isLoading } = useListPlans();
  const [activePlan, setActivePlan] = useState<number | null>(null);

  const goToCustomerPortalMutation = useGoToCustomerPortalMutation();
  const goToCheckoutMutation = useGoToCheckoutMutation();

  const handleSelectPlan = (id: number) => {
    setActivePlan(id);
  };

  const handleContinue = async () => {
    const plan = data?.find(plan => plan.id === activePlan);
    if (!plan) {
      return;
    }

    goToCheckoutMutation.mutate({ id: plan.id });
  };

  const handleGoToCustomerPortal = async () => {
    goToCustomerPortalMutation.mutate();
  };

  return (
    <>
      <CurrentPlanSection onGoToCustomerPortal={handleGoToCustomerPortal} />
      {plan?.is_free ? (
        <div>
          {isLoading ? (
            <LoadingIndicatorBox />
          ) : (
            <>
              <Heading
                as="h1"
                size="xl"
                color="brand.500"
                my="50px"
                textAlign="center"
              >
                Assinar um plano
              </Heading>
              <PlansGrid
                plans={data || []}
                selectedPlan={activePlan}
                onSelectPlan={handleSelectPlan}
              />

              <Flex my="30px" alignItems="center" justifyContent="flex-end">
                <Button
                  variant="primary"
                  data-testid="go-to-checkout-button"
                  isDisabled={!activePlan}
                  onClick={handleContinue}
                >
                  Continuar
                </Button>
              </Flex>
            </>
          )}
        </div>
      ) : (
        <AlreadyPaidSection onGoToCustomerPortal={handleGoToCustomerPortal} />
      )}
    </>
  );
};

export default Plans;
