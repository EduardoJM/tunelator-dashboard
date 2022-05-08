import { FC } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import LoginBox from './LoginBox';
import RequireNoAuth from '../../layouts/RequireNoAuth';

const Login: FC = () => {
  return (
    <RequireNoAuth>
      <Flex minHeight="100vh" width="100%">
        <Box backgroundColor="white" flex="1">
          <Flex
            width="100%"
            minHeight="100%"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p="10px"
          >
            <LoginBox />
          </Flex>
        </Box>
        <Box
          backgroundColor="brand.500"
          flex="1"
          display={{
            base: 'none',
            lg: 'block',
          }}
        ></Box>
      </Flex>
    </RequireNoAuth>
  );
};

export default Login;
