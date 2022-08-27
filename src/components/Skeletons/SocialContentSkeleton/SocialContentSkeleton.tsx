import {
  SimpleGrid,
  Stack,
  Skeleton,
  useBreakpointValue,
} from '@chakra-ui/react';

const items = Array.from({ length: 3 }).map((_, index) => index);

const SocialContentSkeleton = () => {
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
          <Skeleton height="200px" />
        </Stack>
      ))}
    </SimpleGrid>
  );
};

export default SocialContentSkeleton;
