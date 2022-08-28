import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { useLatestSocialContents } from '@/services/queries';
import { SocialContentCard } from '@/components/Features';

const SocialContents = () => {
  const { data } = useLatestSocialContents();
  const width = useBreakpointValue({
    base: 'max(calc(100vw - 50px), 300px)',
    sm: 300,
    md: 400,
    lg: 400,
  });

  return (
    <Flex mb="40px" overflowX="auto" overflowY="hidden">
      <Flex flexWrap="nowrap" gap="20px">
        {data?.map(item => (
          <SocialContentCard
            key={item.id}
            content={item}
            height={300}
            width={width || 400}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default SocialContents;
