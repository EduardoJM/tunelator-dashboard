import { useMemo } from 'react';
import {
  SimpleGrid,
  Stack,
  Skeleton,
  useBreakpointValue,
} from '@chakra-ui/react';

const SocialContentSkeleton = () => {
  const columns = useBreakpointValue({ base: 1, md: 3 });
  const items = useMemo(() => {
    return Array.from({ length: columns || 1 }).map((_, index) => index);
  }, [columns]);

  return (
    <SimpleGrid
      columns={columns}
      spacing="20px"
      data-testid="social-content-skeleton"
      mb="50px"
    >
      {items.map(id => (
        <Stack key={id}>
          <Skeleton height="300px" />
        </Stack>
      ))}
    </SimpleGrid>
  );
};

export default SocialContentSkeleton;
