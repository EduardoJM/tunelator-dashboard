import { FC } from 'react';
import { Box, Heading, Divider, Text } from '@chakra-ui/react';
import { Button, PriceInCents } from '@/components';
import { ActivePlan } from '@/entities/Plan';

export interface CurrentPlanBoxProps {
  plan: ActivePlan;
  onGoToCustomerPortalClick: () => void;
}

const CurrentPlanBox: FC<CurrentPlanBoxProps> = ({
  plan,
  onGoToCustomerPortalClick,
}) => {
  return (
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
            data-testid="customer-portal-button"
            variant="primaryRounded"
            onClick={onGoToCustomerPortalClick}
          >
            Gerenciar
          </Button>
        </>
      )}
    </Box>
  );
};

export default CurrentPlanBox;
