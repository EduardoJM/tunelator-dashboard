import { FC } from 'react';
import { Flex, Box, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import RequireAuth from '../RequireAuth';

const Dashboard: FC = ({ children }) => {
  return (
    <RequireAuth>
      <Flex flexDirection="column" width="100%" minHeight="100vh">
        <NavBar />

        <Box width="100%" flex="1">
          <Container maxW="120ch">
            <Outlet />
          </Container>
        </Box>

        <Box height="200px" backgroundColor="brand.500"></Box>
      </Flex>
    </RequireAuth>
  );
};

export default Dashboard;
