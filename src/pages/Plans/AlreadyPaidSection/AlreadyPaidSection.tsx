import { FC } from 'react';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import { Button } from '../../../components';

export interface AlreadyPaidSection {
  onGoToCustomerPortal: () => void;
}

const AlreadyPaidSection: FC<AlreadyPaidSection> = ({
  onGoToCustomerPortal,
}) => {
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
        Outros Planos
      </Heading>

      <Text as="p" data-testid="description" fontSize="lg">
        Atualmente, para poder mudar o plano da sua assinatura você precisa
        cancelar a sua assinatura atual e fazer uma nova. Estamos trabalhando
        para melhorar essa experiência, porém, atualmente você pode acessar o
        portal do cliente para gerenciar a sua assinatura:
      </Text>
      <Flex mt="30px" width="100%" alignItems="center" justifyContent="center">
        <Button
          data-testid="customer-portal-button"
          variant="primaryRounded"
          onClick={onGoToCustomerPortal}
        >
          Portal do Cliente
        </Button>
      </Flex>
    </Box>
  );
};

export default AlreadyPaidSection;
