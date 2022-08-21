import { Flex, Stack, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import * as CSS from 'csstype';

const ProfileFormSkeleton = () => {
  const flexDirection = useBreakpointValue<CSS.Property.FlexDirection>({
    base: 'column',
    md: 'row',
  });

  return (
    <Stack data-testid="profile-form-skeleton">
      <Skeleton height="40px" mb="15px" />
      <Skeleton height="20px" mb="30px" />

      <Flex gap="10px" mb="40px" pt="40px" flexDir={flexDirection}>
        <Skeleton height="80px" w="100%" />
        <Skeleton height="80px" w="100%" />
      </Flex>
    </Stack>
  );
};

export default ProfileFormSkeleton;
