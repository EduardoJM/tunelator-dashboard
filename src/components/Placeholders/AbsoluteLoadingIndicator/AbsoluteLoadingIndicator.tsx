import { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import styles from './AbsoluteLoadingIndicator.module.scss';

const AbsoluteLoadingIndicator: FC = () => {
  return (
    <Flex
      width="100%"
      height="100vh"
      position="fixed"
      left="0"
      top="0"
      backgroundColor="brand.500"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      zIndex="600"
    >
      <svg
        className={styles.loadingAnimation}
        width="512"
        height="512"
        viewBox="0 0 512 512"
      >
        <g>
          <path
            className={styles.outside}
            d="M 88.857136,105.89839 H 423.14286 c 20.57715,0 37.14286,16.56572 37.14286,37.14286 v 237.85714 c 0,20.57714 -16.56571,37.14286 -37.14286,37.14286 H 88.857136 c -20.577143,0 -37.142857,-16.56572 -37.142857,-37.14286 V 143.04125 c 0,-20.57714 16.565714,-37.14286 37.142857,-37.14286 z"
          />
          <path
            d="M 53.013939,151.8465 255.99358,254.7321 457.55248,151.12635"
            className={styles.lines}
          />
        </g>
      </svg>
      <Text color="#FFF" mt="20px" fontSize="lg">
        Carregando...
      </Text>
    </Flex>
  );
};

export default AbsoluteLoadingIndicator;
