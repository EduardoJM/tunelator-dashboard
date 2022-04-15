import { FC } from 'react';
import { Flex, CircularProgress } from '@chakra-ui/react';
import { useLoading } from '../../contexts/loading';

const AbsoluteLoadingIndicator: FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) {
    return null;
  }
  return (
    <Flex
      width="100%"
      height="100vh"
      position="fixed"
      left="0"
      top="0"
      backgroundColor="brand.500"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress isIndeterminate color="brand.50" />
    </Flex>
  );
};

export default AbsoluteLoadingIndicator;
