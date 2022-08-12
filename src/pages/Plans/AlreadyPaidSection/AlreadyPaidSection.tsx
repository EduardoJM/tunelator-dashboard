import { FC } from 'react';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components';

export interface AlreadyPaidSection {
  onGoToCustomerPortal: () => void;
}

const AlreadyPaidSection: FC<AlreadyPaidSection> = ({
  onGoToCustomerPortal,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      width="100%"
      my="60px"
      p="20px"
      border="1px solid #DDD"
      borderRadius="5px"
      backgroundColor="#FEFEFE"
      boxShadow="md"
      data-testid="already-paid-section"
      _hover={{ backgroundColor: '#EFEFEF' }}
    >
      <Heading as="h2" size="lg" color="brand.500" mb="30px">
        {t('plans.alreadypaid.title')}
      </Heading>

      <Text as="p" data-testid="description" fontSize="lg">
        {t('plans.alreadypaid.subtitle')}
      </Text>
      <Flex mt="30px" width="100%" alignItems="center" justifyContent="center">
        <Button
          data-testid="customer-portal-button"
          variant="primaryRounded"
          onClick={onGoToCustomerPortal}
        >
          {t('plans.alreadypaid.manage')}
        </Button>
      </Flex>
    </Box>
  );
};

export default AlreadyPaidSection;
