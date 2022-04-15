import { FC } from 'react';
import { Container, Heading } from '@chakra-ui/react';

const MailAccounts: FC = () => {
  return (
    <>
      <Container maxW="120ch">
        <Heading as="h1" size="lg" my="50px" fontWeight="bold">
          Minhas Contas de E-mail
        </Heading>
        Aqui vem o resto.
      </Container>
    </>
  );
};

export default MailAccounts;
