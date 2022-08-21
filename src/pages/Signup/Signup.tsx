import { FC } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import SignupBox from './SignupBox';
import { RequireNoAuth } from '@/components/Features';

const Signup: FC = () => {
  return (
    <RequireNoAuth>
      <Flex height="100vh" width="100%" overflowY="auto">
        <Box backgroundColor="white" flex="1">
          <Flex
            width="100%"
            minHeight="100%"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p="10px"
          >
            <SignupBox />
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

export default Signup;
