import { FC } from 'react';
import { Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { GiTakeMyMoney } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components';

const AlreadyPaid: FC = () => {
  const boxWidth = useBreakpointValue({ base: '100%', md: '50%' });

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
            Você já possui uma assinatura paga...
          </Heading>
          <Heading
            as="h2"
            size="md"
            mt="50px"
            color="brand.500"
            fontWeight="normal"
          >
            Atualmente só é possível alterar o plano da assinatura cancelando a
            assinatura e assinando uma nova. Estamos trabalhando para melhorar
            isso, porém, por enquanto, você pode ir na página de Planos e
            Assinaturas, em Gerenciar, e cancelar a atual e assinar uma nova.
          </Heading>
        </Flex>
        <Flex
          width={boxWidth}
          alignItems="center"
          justifyContent="center"
          color="brand.500"
        >
          <GiTakeMyMoney size="200px" />
        </Flex>
      </Flex>
      <Flex alignItems="center" justifyContent="center" pt="20px" pb="60px">
        <Button onClick={handleGoToPlans} variant="primaryRounded">
          Planos e Assinatura
        </Button>
      </Flex>
    </Flex>
  );
};

export default AlreadyPaid;