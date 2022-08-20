import { FC, useMemo } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { User } from '@/entities/User';

export interface AvatarProps {
  user: User;
}

const Avatar: FC<AvatarProps> = ({ user }) => {
  const initials = useMemo(() => {
    if (!!user.first_name) {
      const firstLetter = user.first_name[0].toUpperCase();
      if (!!user.last_name) {
        const lastLetter = user.last_name[0].toUpperCase();
        return `${firstLetter}${lastLetter}`;
      }
      return firstLetter;
    }
    return user.email[0].toUpperCase();
  }, [user]);

  return (
    <Flex
      width="48px"
      height="48px"
      borderRadius="50%"
      backgroundColor="white"
      color="brand.500"
      alignItems="center"
      justifyContent="center"
      mr="5px"
      data-testid="avatar"
    >
      <Text fontWeight={'bold'}>{initials}</Text>
    </Flex>
  );
};

export default Avatar;
