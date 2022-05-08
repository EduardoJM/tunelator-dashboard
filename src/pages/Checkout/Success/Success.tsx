import { FC } from 'react';
import { Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { BiHappyHeartEyes } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components';

const Success: FC = () => {
  const boxWidth = useBreakpointValue({ base: '100%', md: '50%' });

  const navigate = useNavigate();

  const handleGoToPlans = () => {
    navigate('/plans');
  };

  const handleGoToHome = () => {
    navigate('/');
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
            Pagamento efetuado
          </Heading>
          <Heading
            as="h2"
            size="md"
            mt="50px"
            color="brand.500"
            fontWeight="normal"
          >
            Você pode conferir se o seu pagamento já foi processado em Planos e
            Assinaturas, bem como pode conferir isso no nosso painel.
          </Heading>
        </Flex>
        <Flex
          width={boxWidth}
          alignItems="center"
          justifyContent="center"
          color="brand.500"
        >
          <BiHappyHeartEyes size="200px" />
        </Flex>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        pt="20px"
        pb="60px"
        gap="10px"
      >
        <Button onClick={handleGoToHome} variant="primaryRounded">
          Início
        </Button>
        <Button onClick={handleGoToPlans} variant="primaryRounded">
          Planos e Assinatura
        </Button>
      </Flex>
    </Flex>
  );
};

export default Success;
