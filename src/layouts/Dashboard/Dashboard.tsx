import { FC } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import NavBar from '../../components/NavBar';
import RequireAuth from '../RequireAuth';

const Dashboard: FC = ({ children }) => {
  return (
    <RequireAuth>
      <Flex flexDirection="column" width="100%" minHeight="100vh">
        <NavBar />

        <Box width="100%" flex="1">
          {children}
        </Box>

        <Box height="200px" backgroundColor="brand.500"></Box>
      </Flex>
    </RequireAuth>
  );
};

export default Dashboard;
