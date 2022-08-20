import { FC, Suspense, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { usePlan } from '@/contexts/plan';
import { useGoToCustomerPortalMutation } from '@/services/mutations';
import { PlansSekeleton } from '@/components/Skeletons';
import CurrentPlanSection from './CurrentPlanSection';
import AlreadyPaidSection from './AlreadyPaidSection';
import PlansSection from './PlansSection';

const Plans: FC = () => {
  const goToCustomerPortalMutation = useGoToCustomerPortalMutation();
  const { plan } = usePlan();

  const { t } = useTranslation();

  const handleGoToCustomerPortal = async () => {
    goToCustomerPortalMutation.mutate();
  };

  return (
    <>
      <CurrentPlanSection onGoToCustomerPortal={handleGoToCustomerPortal} />
      {plan?.is_free ? (
        <div data-testid="QQQ-22">
          <Heading
            as="h1"
            size="xl"
            color="brand.500"
            my="50px"
            textAlign="center"
          >
            {t('plans.title')}
          </Heading>

          <Suspense fallback={<PlansSekeleton />}>
            <PlansSection />
          </Suspense>
        </div>
      ) : (
        <AlreadyPaidSection onGoToCustomerPortal={handleGoToCustomerPortal} />
      )}
    </>
  );
};

export default Plans;
