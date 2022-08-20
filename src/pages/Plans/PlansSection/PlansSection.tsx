import { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { PlansGrid } from '@/components/Features';
import { Button } from '@/components/Common';
import { useListPlans } from '@/services/queries';
import { useGoToCheckoutMutation } from '@/services/mutations';

const PlansSection = () => {
  const goToCheckoutMutation = useGoToCheckoutMutation();

  const { t } = useTranslation();

  const { data } = useListPlans();

  const [activePlan, setActivePlan] = useState<number | null>(null);

  const handleContinue = async () => {
    const plan = data?.find(plan => plan.id === activePlan);
    if (!plan) {
      return;
    }

    goToCheckoutMutation.mutate({ id: plan.id });
  };

  const handleSelectPlan = (id: number) => {
    setActivePlan(id);
  };

  return (
    <>
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
          {t('plans.continue')}
        </Button>
      </Flex>
    </>
  );
};

export default PlansSection;
