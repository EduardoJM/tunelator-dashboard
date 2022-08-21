import {
  SimpleGrid,
  Stack,
  Skeleton,
  useBreakpointValue,
} from '@chakra-ui/react';

const items = Array.from({ length: 3 }).map((_, index) => index);

const PlansSkeleton = () => {
  const columns = useBreakpointValue({ base: 1, md: 3 });

  return (
    <SimpleGrid
      columns={columns}
      spacing="20px"
      data-testid="plans-skeleton"
      mb="50px"
    >
      {items.map(item => (
        <Stack key={item}>
          <Skeleton height="20px" mb="20px" />
          <Skeleton height="40px" mb="20px" />
          <Skeleton height="60px" mb="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ))}
    </SimpleGrid>
  );
};

export default PlansSkeleton;
