import { FC } from 'react';
import {
  VStack,
  Heading,
  Text,
  Box,
  List,
  ListItem,
  ListIcon,
  Spacer,
  Flex,
} from '@chakra-ui/react';
import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { Button, PriceInCents } from '@/components';
import { Plan } from '@/entities/Plan';

export interface PlanItemProps {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
}

const PlanItem: FC<PlanItemProps> = ({ plan, selected, onSelect }) => {
  const { t } = useTranslation();

  return (
    <VStack
      key={plan.id}
      data-testid="plan-item"
      borderRadius="5px"
      borderWidth="1px"
      borderColor="brand.500"
      backgroundColor={selected ? 'brand.500' : 'transparent'}
      p="20px"
    >
      <Heading
        as="h2"
        size="lg"
        color={selected ? 'white' : 'brand.500'}
        mb="25px"
        textAlign="center"
      >
        {plan.name}
      </Heading>

      <Heading
        as="h3"
        size="2xl"
        color={selected ? 'white' : 'brand.500'}
        textAlign="center"
      >
        <PriceInCents value={plan.monthly_price} />
        <Text fontSize="sm" display="inline">
          /mês
        </Text>
      </Heading>

      {!!plan.description && (
        <Box height="130px" pt="15px" color={selected ? 'white' : 'brand.500'}>
          <Text fontSize="lg" textAlign="center">
            {plan.description}
          </Text>
        </Box>
      )}

      {plan.display_features.length > 0 && (
        <List data-testid="feature-list" spacing="10px" mb="20px">
          {plan.display_features.map(item => (
            <ListItem key={item.name} color={selected ? 'white' : 'black'}>
              {item.enabled ? (
                <ListIcon
                  as={AiFillCheckCircle}
                  color={selected ? 'white' : 'brand.500'}
                />
              ) : (
                <ListIcon
                  as={AiFillCloseCircle}
                  color={selected ? 'red.300' : 'red.500'}
                />
              )}

              {item.name}
            </ListItem>
          ))}
        </List>
      )}

      <Spacer />

      <Flex width="100%" alignItems="center" justifyContent="center">
        <Button
          variant="primaryRounded"
          isDisabled={selected}
          onClick={onSelect}
        >
          {t('plansItem.select')}
        </Button>
      </Flex>
    </VStack>
  );
};

export default PlanItem;
