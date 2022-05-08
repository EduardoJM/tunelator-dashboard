import { FC, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import Dashboard from '../../layouts/Dashboard';

const Checkout: FC = () => {
  return (
    <Dashboard>
      <Container maxW="120ch" py="50px">
        <Outlet />
      </Container>
    </Dashboard>
  );
};

export default Checkout;
