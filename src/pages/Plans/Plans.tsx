import { FC, useState } from 'react';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import LoadingIndicatorBox from '../../components/Placeholders/LoadingIndicatorBox';
import { PlansGrid, Button } from '../../components';
import CurrentPlanSection from './CurrentPlanSection';
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
        <Box
          width="100%"
          my="60px"
          p="20px"
          border="1px solid #DDD"
          borderRadius="5px"
          backgroundColor="#FEFEFE"
          boxShadow="md"
          _hover={{ backgroundColor: '#EFEFEF' }}
        >
          <Heading as="h2" size="lg" color="brand.500" mb="30px">
            Outros Planos
          </Heading>

          <Text fontSize="lg">
            Atualmente, para poder mudar o plano da sua assinatura você precisa
            cancelar a sua assinatura atual e fazer uma nova. Estamos
            trabalhando para melhorar essa experiência, porém, atualmente você
            pode acessar o portal do cliente para gerenciar a sua assinatura:
          </Text>
          <Flex
            mt="30px"
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Button variant="primaryRounded" onClick={handleGoToCustomerPortal}>
              Portal do Cliente
            </Button>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Plans;
