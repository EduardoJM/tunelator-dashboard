import { FC } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import SignupBox from './SignupBox';

const Signup: FC = () => {
  return (
    <Flex height="100vh" width="100%">
      <Box backgroundColor="white" flex="1">
        <Flex
          width="100%"
          height="100%"
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
  );
};

export default Signup;
