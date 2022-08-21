import { FC } from 'react';
import { Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { BiSad } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Common';

const Error: FC = () => {
  const boxWidth = useBreakpointValue({ base: '100%', md: '50%' });
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleGoToPlans = () => {
    navigate('/plans');
  };

  return (
    <Flex h="100%" flexDir="column" alignItems="stretch">
      <Flex flex="1" alignItems="stretch" flexWrap="wrap-reverse">
        <Flex
          w={boxWidth}
          alignItems="stretch"
          justifyContent="center"
          flexDir="column"
        >
          <Heading as="h1" size="xl" color="brand.500">
            {t('customer.error.title')}
          </Heading>
          <Heading
            as="h2"
            size="md"
            mt="50px"
            color="brand.500"
            fontWeight="normal"
          >
            {t('customer.error.body')}
          </Heading>
        </Flex>
        <Flex
          width={boxWidth}
          alignItems="center"
          justifyContent="center"
          color="brand.500"
        >
          <BiSad size="200px" />
        </Flex>
      </Flex>
      <Flex alignItems="center" justifyContent="center" pt="20px" pb="60px">
        <Button
          onClick={handleGoToPlans}
          variant="primaryRounded"
          data-testid="plans-button"
        >
          {t('customer.error.plans')}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Error;
