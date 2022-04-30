import { FC, useState } from 'react';
import {
  Container,
  SimpleGrid,
  Box,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  Flex,
  Spacer,
  VStack,
  Divider,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import LoadingIndicatorBox from '../../components/LoadingIndicatorBox';
import PriceInCents from '../../components/PriceInCents';
import { listPlans } from '../../services/plans';
import Button from '../../components/Button';
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
  const columns = useBreakpointValue({ base: 1, md: 3 });

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
      <div>
        {!plan ? (
          <LoadingIndicatorBox />
        ) : (
          <Container maxW="120ch" mt="60px">
            <Box
              width="100%"
              p="20px"
              border="1px solid #DDD"
              borderRadius="5px"
              backgroundColor="#FEFEFE"
              boxShadow="md"
              _hover={{ backgroundColor: '#EFEFEF' }}
            >
              <Heading as="h2" size="lg" color="brand.500">
                Meu Plano
              </Heading>
              <Divider mb="20px" />
              <Heading as="h3" size="md">
                {plan.name}
              </Heading>
              <Text>{plan.description}</Text>
              <Divider mb="20px" />
              <Heading as="h3" size="2xl" color="brand.500">
                <PriceInCents value={plan.monthly_price} />
                <Text fontSize="sm" display="inline">
                  /mês
                </Text>
              </Heading>
              {!plan.is_free && (
                <>
                  <Divider mb="30px" />
                  <Button
                    variant="primary-rounded"
                    onClick={handleGoToCustomerPortal}
                  >
                    Gerenciar
                  </Button>
                </>
              )}
            </Box>
          </Container>
        )}
      </div>
      {plan?.is_free ? (
        <div>
          {plans.isLoading ? (
            <LoadingIndicatorBox />
          ) : (
            <Container maxW="120ch" mt="60px">
              <Heading
                as="h1"
                size="xl"
                color="brand.500"
                my="50px"
                textAlign="center"
              >
                Assinar um plano
              </Heading>
              <SimpleGrid columns={columns} spacing="20px">
                {plans.data?.map(plan => (
                  <VStack
                    key={plan.id}
                    borderRadius="5px"
                    borderWidth="1px"
                    borderColor="brand.500"
                    backgroundColor={
                      activePlan === plan.id ? 'brand.500' : 'transparent'
                    }
                    p="20px"
                  >
                    <Heading
                      as="h2"
                      size="lg"
                      color={activePlan === plan.id ? 'white' : 'brand.500'}
                      mb="25px"
                      textAlign="center"
                    >
                      {plan.name}
                    </Heading>

                    <Heading
                      as="h3"
                      size="2xl"
                      color={activePlan === plan.id ? 'white' : 'brand.500'}
                      textAlign="center"
                    >
                      <PriceInCents value={plan.monthly_price} />
                      <Text fontSize="sm" display="inline">
                        /mês
                      </Text>
                    </Heading>

                    {!!plan.description && (
                      <Box
                        height="130px"
                        pt="15px"
                        color={activePlan === plan.id ? 'white' : 'brand.500'}
                      >
                        <Text fontSize="lg" textAlign="center">
                          {plan.description}
                        </Text>
                      </Box>
                    )}

                    {plan.display_features.length > 0 && (
                      <List spacing="10px" mb="20px">
                        {plan.display_features.map(item => (
                          <ListItem
                            key={item.name}
                            color={activePlan === plan.id ? 'white' : 'black'}
                          >
                            {item.enabled ? (
                              <ListIcon
                                as={AiFillCheckCircle}
                                color={
                                  activePlan === plan.id ? 'white' : 'brand.500'
                                }
                              />
                            ) : (
                              <ListIcon
                                as={AiFillCloseCircle}
                                color={
                                  activePlan === plan.id ? 'red.300' : 'red.500'
                                }
                              />
                            )}

                            {item.name}
                          </ListItem>
                        ))}
                      </List>
                    )}

                    <Spacer />

                    <Flex
                      width="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Button
                        variant="primary-rounded"
                        isDisabled={activePlan === plan.id}
                        onClick={() => handleSelectPlan(plan.id)}
                      >
                        Selecionar
                      </Button>
                    </Flex>
                  </VStack>
                ))}
              </SimpleGrid>

              <Flex my="30px" alignItems="center" justifyContent="flex-end">
                <Button
                  variant="primary"
                  isDisabled={!activePlan}
                  onClick={handleContinue}
                >
                  Continuar
                </Button>
              </Flex>
            </Container>
          )}
        </div>
      ) : (
        <Container maxW="120ch" mt="60px">
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
              Atualmente, para poder mudar o plano da sua assinatura você
              precisa cancelar a sua assinatura atual e fazer uma nova. Estamos
              trabalhando para melhorar essa experiência, porém, atualmente você
              pode acessar o portal do cliente para gerenciar a sua assinatura:
            </Text>
            <Flex
              mt="30px"
              width="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant="primary-rounded"
                onClick={handleGoToCustomerPortal}
              >
                Portal do Cliente
              </Button>
            </Flex>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Plans;
