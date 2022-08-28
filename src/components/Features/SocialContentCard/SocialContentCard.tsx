import { FC, useMemo } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { SocialContent } from '@/entities/SocialContent';

export interface SocialContentCardProps {
  content: SocialContent;
  height: 300;
}

const SocialContentCard: FC<SocialContentCardProps> = ({ content, height }) => {
  const style = useMemo(() => {
    if (!content.image) {
      return {};
    }
    return {
      backgroundImage: `url(${content.image})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    };
  }, [content]);

  return (
    <Box
      bg="brand.500"
      color="#FFF"
      borderRadius={10}
      w="100%"
      h={height}
      style={style}
      data-testid="social-content-card"
    >
      <Box bgColor="rgba(0, 0, 0, 0.3)" w="100%" h="100%" borderRadius={10}>
        <Flex
          h="100%"
          flexDir="column"
          alignItems="stretch"
          justifyContent="flex-end"
          padding="15px"
        >
          <Text fontSize={['12px', '16px']} fontWeight="bold">
            {content.type}
          </Text>
          <Heading as="h2" fontSize={['20px', '24px']} my="2">
            {content.title}
          </Heading>
          <Text fontSize={['12px', '16px']} fontWeight="bold">
            {content.description}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default SocialContentCard;
