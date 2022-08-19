import { Stack, Skeleton } from '@chakra-ui/react';

const TableSkeleton = () => (
  <Stack>
    <Skeleton height="20px" />
    <Skeleton height="20px" />
    <Skeleton height="20px" />
    <Skeleton height="20px" />
    <Skeleton height="20px" />
    <Skeleton height="20px" />
  </Stack>
);

export default TableSkeleton;
