import { FC } from 'react';
import { Flex, Box, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { RequireAuth } from '@/components/Features';
import NavBar from '../NavBar';

const Dashboard: FC = () => {
  return (
    <RequireAuth>
      <Flex flexDirection="column" width="100%" minHeight="100vh">
        <NavBar />

        <Flex width="100%" flex="1" alignItems="stretch">
          <Container maxW="120ch">
            <Outlet />
          </Container>
        </Flex>

        <Box height="200px" backgroundColor="brand.500"></Box>
      </Flex>
    </RequireAuth>
  );
};

export default Dashboard;
