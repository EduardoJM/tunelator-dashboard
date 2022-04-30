import { FC } from 'react';
import { useSpring, animated } from 'react-spring';
import { Flex, Text } from '@chakra-ui/react';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import Button from '../Button';

export interface NoAccountsBoxProps {
  createFirstButtonVisible?: boolean;
  onCreateFirstClick?: () => void;
}

const NoAccountsBox: FC<NoAccountsBoxProps> = ({
  createFirstButtonVisible,
  onCreateFirstClick,
}) => {
  const accountIconStyle = useSpring({
    loop: true,
    config: {
      duration: 1500,
    },
    to: [
      { opacity: 1, transform: 'rotateZ(-15deg) scale(1.2)' },
      { opacity: 0.3, transform: 'rotateZ(15deg) scale(1)' },
    ],
    from: { opacity: 0.3, transform: 'rotateZ(15deg) scale(1)' },
  });

  return (
    <Flex
      width="100%"
      height="100%"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <animated.div
        style={{
          width: 48,
          height: 48,
          transformOrigin: 'center bottom',
          ...accountIconStyle,
        }}
      >
        <RiAccountPinCircleLine size="48px" />
      </animated.div>
      <Text mt="20px" fontSize="md" fontWeight="bold">
        Nenhuma conta para ser mostrada.
      </Text>
      {createFirstButtonVisible && (
        <Button
          mt="20px"
          variant="primary-rounded"
          onClick={onCreateFirstClick}
        >
          Criar Primeira Conta
        </Button>
      )}
    </Flex>
  );
};

export default NoAccountsBox;
