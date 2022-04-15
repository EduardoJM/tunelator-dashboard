import { FC } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import LoginBox from './LoginBox';

const Login: FC = () => {
  return (
    <Flex height="100vh" width="100%">
      <Box backgroundColor="white" flex="1">
        <Flex
          width="100%"
          height="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <LoginBox />
        </Flex>
      </Box>
      <Box backgroundColor="brand.500" flex="1"></Box>
    </Flex>
  );
};

export default Login;
