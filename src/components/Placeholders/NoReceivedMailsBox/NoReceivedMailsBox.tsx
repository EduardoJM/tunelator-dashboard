import { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useSpring, animated, easings } from 'react-spring';
import { RiMailSendLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

const NoReceivedMailsBox: FC = () => {
  const mailsIconStyle = useSpring({
    loop: true,
    config: {
      duration: 1500,
      easing: easings.easeOutBounce,
    },
    to: { transform: 'translateX(100%)' },
    from: { transform: 'translateX(-100%)' },
  });
  const { t } = useTranslation();

  return (
    <Flex
      width="100%"
      height="100%"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      data-testid="no-received-mails"
    >
      <animated.div
        style={{
          width: 48,
          height: 48,
          transformOrigin: 'center bottom',
          ...mailsIconStyle,
        }}
      >
        <RiMailSendLine size="48px" />
      </animated.div>
      <Text mt="20px" fontSize="md" fontWeight="bold">
        {t('noReceivedMailsBox.description')}
      </Text>
    </Flex>
  );
};

export default NoReceivedMailsBox;
