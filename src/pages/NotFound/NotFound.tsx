import { FC } from 'react';
import { Flex, Heading } from '@chakra-ui/react';

const NotFound: FC = () => {
  return (
    <Flex
      width="100%"
      height="100vh"
      position="absolute"
      left="0"
      top="0"
      zIndex="300"
      bgColor="white"
      color="brand.500"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading as="h1" size="3xl" textAlign="center">
        404
      </Heading>
      <Heading as="h2" size="lg" textAlign="center">
        Ooops! Essa página não foi encontrada.
      </Heading>
    </Flex>
  );
};

export default NotFound;
