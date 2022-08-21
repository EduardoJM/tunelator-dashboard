import { Box, Stack, Skeleton } from '@chakra-ui/react';

const AccountsSkeleton = () => (
  <Stack data-testid="table-skeleton">
    <Box padding="6" boxShadow="lg" bg="white" mb="20px">
      <Skeleton height="20px" />
      <Skeleton height="20px" mb="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" mb="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" mb="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" mb="20px" />
    </Box>
    <Box padding="6" boxShadow="lg" bg="white">
      <Skeleton height="20px" />
      <Skeleton height="20px" mb="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" mb="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" mb="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" mb="20px" />
    </Box>
  </Stack>
);

export default AccountsSkeleton;
