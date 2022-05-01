import { FC } from 'react';
import { Alert, AlertIcon, Container, Heading } from '@chakra-ui/react';
import Dashboard from '../../layouts/Dashboard';

const ReceivedMails: FC = () => {
  return (
    <Dashboard>
      <Container maxW="120ch">
        <Heading as="h1" size="lg" my="50px" fontWeight="bold">
          E-mails Recebidos
        </Heading>

        <Alert status="info" variant="top-accent">
          <AlertIcon />
          Mantemos um histórico dos e-mails recebidos nos últimos 30 dias. Nessa
          página você consegue visualizar o histórico de redirecionamentos e
          executar algumas ações, como, por exemplo, reenviar algum dos e-mails.
        </Alert>
      </Container>
    </Dashboard>
  );
};

export default ReceivedMails;
