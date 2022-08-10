import { FC } from 'react';
import { useSpring, animated, easings } from 'react-spring';
import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { FaWrench } from 'react-icons/fa';
import { BiCog } from 'react-icons/bi';
import { GoMailRead } from 'react-icons/go';
import { useTranslation } from 'react-i18next';

const CreatingMailBox: FC = () => {
  const height = useBreakpointValue({ base: '200px', md: '100px' });
  const textBlockHeight = useBreakpointValue({ base: '100px', md: '100%' });
  const { t } = useTranslation();

  const wrenchAnimationStyle = useSpring({
    loop: true,
    config: {
      duration: 1500,
    },
    to: [
      { transform: 'translateY(-50%) rotateZ(-25deg)' },
      { transform: 'translateY(-50%) rotateZ(25deg)' },
    ],
    from: { transform: 'translateY(-50%) rotateZ(25deg)' },
  });

  const cogAnimationStyle = useSpring({
    loop: true,
    config: { duration: 3500 },
    to: { transform: 'translate(30%, 30%) rotateZ(360deg)' },
    from: { transform: 'translate(30%, 30%) rotateZ(0deg)' },
  });

  const mailAnimationStyle = useSpring({
    loop: true,
    config: { duration: 3500, easing: easings.easeOutBounce },
    to: [{ transform: 'translateY(-100px)' }],
    from: { transform: 'translateY(100px)' },
  });

  return (
    <Box
      bgColor="brand.500"
      color="white"
      h={height}
      position="relative"
      borderRadius="10px"
      boxShadow="lg"
      mb="10px"
      overflow="hidden"
      data-testid="creating-mail-box"
    >
      <animated.div
        style={{
          width: '48px',
          height: 'auto',
          position: 'absolute',
          transformOrigin: 'top right',
          right: '50px',
          bottom: 0,
          ...wrenchAnimationStyle,
        }}
      >
        <FaWrench size="48px" />
      </animated.div>
      <animated.div
        style={{
          width: '68px',
          height: 'auto',
          position: 'absolute',
          right: 0,
          bottom: 0,
          ...cogAnimationStyle,
        }}
      >
        <BiCog size="68px" />
      </animated.div>
      <animated.div
        style={{
          width: '48px',
          height: 'auto',
          position: 'absolute',
          right: '110px',
          bottom: 0,
          ...mailAnimationStyle,
        }}
      >
        <GoMailRead size="48px" />
      </animated.div>
      <Flex p="10px" h={textBlockHeight} alignItems="center">
        <Text fontSize="lg" fontWeight="bold">
          {t('creatingMailBox.text')}
        </Text>
      </Flex>
    </Box>
  );
};

export default CreatingMailBox;
