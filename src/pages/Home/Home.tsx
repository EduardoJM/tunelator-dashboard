import { FC } from 'react';
import { Container, Heading } from '@chakra-ui/react';
import Dashboard from '../../layouts/Dashboard';
import LatestMailAccounts from './LatestMailAccounts';
import LatestReceivedMails from './LatestReceivedMails';

const Home: FC = () => {
  return (
    <Dashboard>
      <Container maxW="120ch">
        <Heading as="h1" size="xl" my="50px" fontWeight="bold">
          Bem-vindo!
        </Heading>
        <LatestMailAccounts />
        <LatestReceivedMails />
      </Container>
    </Dashboard>
  );
};

export default Home;
