import { FC, useState } from 'react';
import { Container, Box, Heading, Text, Flex, Divider } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import LoadingIndicatorBox from '../../components/Placeholders/LoadingIndicatorBox';
import { CurrentPlanBox, PlansGrid, PriceInCents } from '../../components';
import { listPlans } from '../../services/plans';
import Button from '../../components/Common/Button';
import {
  createSession,
  goToCheckout,
  createCustomerPortalSession,
  goToCustomerPortal,
} from '../../services/payments';
import { useLoading } from '../../contexts/loading';
import { usePlan } from '../../contexts/plan';

const Plans: FC = () => {
  const { plan } = usePlan();
  const plans = useQuery('plans', listPlans);
  const { pushLoading } = useLoading();
  const [activePlan, setActivePlan] = useState<number | null>(null);

  const handleSelectPlan = (id: number) => {
    setActivePlan(id);
  };

  const handleContinue = async () => {
    const plan = plans?.data?.find(plan => plan.id === activePlan);
    if (!plan) {
      return;
    }
    pushLoading();
    const session = await createSession(plan.id);
    goToCheckout(session);
  };

  const handleGoToCustomerPortal = async () => {
    pushLoading();
    const session = await createCustomerPortalSession();
    goToCustomerPortal(session);
  };

  return (
    <>
      <Box mt="60px">
        {!plan ? (
          <LoadingIndicatorBox />
        ) : (
          <CurrentPlanBox
            plan={plan}
            onGoToCustomerPortalClick={handleGoToCustomerPortal}
          />
        )}
      </Box>
      {plan?.is_free ? (
        <div>
          {plans.isLoading ? (
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
                plans={plans.data || []}
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
