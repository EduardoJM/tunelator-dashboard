import { FC } from 'react';
import { Flex, CircularProgress } from '@chakra-ui/react';

const LoadingIndicatorBox: FC = () => (
  <Flex width="100%" height="200px" alignItems="center" justifyContent="center">
    <CircularProgress isIndeterminate={true} color="brand.500" />
  </Flex>
);

export default LoadingIndicatorBox;
