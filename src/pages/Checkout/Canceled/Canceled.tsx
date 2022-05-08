import { FC } from 'react';
import { Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { FaRegSadTear } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components';

const Canceled: FC = () => {
  const boxWidth = useBreakpointValue({ base: '100%', md: '50%' });

  const navigate = useNavigate();

  const handleGoToPlans = () => {
    navigate('/plans');
  };

  const handleGoToSupport = () => {
    navigate('/support');
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
            Não desista da sua privacidade...
          </Heading>
          <Heading
            as="h2"
            size="md"
            mt="50px"
            color="brand.500"
            fontWeight="normal"
          >
            Vimos que sua seção no carrinho de compras foi cancelada,
            gostariamos de saber se você precisa de ajuda para se decidir? Fale
            com o nosso suporte...
          </Heading>
        </Flex>
        <Flex
          width={boxWidth}
          alignItems="center"
          justifyContent="center"
          color="brand.500"
        >
          <FaRegSadTear size="200px" />
        </Flex>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        pt="20px"
        pb="60px"
        gap="10px"
      >
        <Button onClick={handleGoToSupport} variant="primaryRounded">
          Falar com o Suporte
        </Button>
        <Button onClick={handleGoToPlans} variant="primaryRounded">
          Planos e Assinatura
        </Button>
      </Flex>
    </Flex>
  );
};

export default Canceled;
