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
  useBreakpointValue,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import LoadingIndicatorBox from '../../components/LoadingIndicatorBox';
import PriceInCents from '../../components/PriceInCents';
import { listPlans } from '../../services/plans';
import Button from '../../components/Button';

const Plans: FC = () => {
  const plans = useQuery('plans', listPlans);
  const [activePlan, setActivePlan] = useState<number | null>(null);
  const columns = useBreakpointValue({ base: 1, md: 3 });
  const navigate = useNavigate();

  const handleSelectPlan = (id: number) => {
    setActivePlan(id);
  };

  const handleContinue = () => {
    const plan = plans?.data?.find(plan => plan.id === activePlan);
    if (!plan) {
      return;
    }
    navigate('/plans/checkout', { state: { plan } });
  };

  return (
    <>
      <div>
        {plans.isLoading ? (
          <LoadingIndicatorBox />
        ) : (
          <Container maxW="120ch" mt="60px">
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
    </>
  );
};

export default Plans;
