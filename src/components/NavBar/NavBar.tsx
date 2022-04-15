import { FC } from 'react';
import {
  Flex,
  Text,
  Spacer,
  Menu,
  MenuButton,
  MenuItem,
  MenuDivider,
  MenuList,
  Link,
} from '@chakra-ui/react';
import { Link as RoutingLink } from 'react-router-dom';
import Avatar from '../Avatar';
import { MdArrowDropDown } from 'react-icons/md';
import { useAuth } from '../../contexts/auth';

const NavBar: FC = () => {
  const { userData, logout } = useAuth();

  function handleLogoutClick() {
    logout();
  }

  if (!userData) {
    return null;
  }

  return (
    <Flex
      width="100%"
      height="64px"
      backgroundColor="brand.500"
      color="white"
      alignItems="center"
      justifyContent="space-between"
      px="50px"
    >
      <Link
        as={RoutingLink}
        fontWeight="bold"
        to="/"
        _hover={{ textDecoration: 'none' }}
      >
        TUNELATOR
      </Link>
      <Spacer />
      <Link
        as={RoutingLink}
        to="/"
        mr="10px"
        _hover={{ textDecoration: 'none' }}
      >
        Início
      </Link>
      <Link
        as={RoutingLink}
        to="/mails"
        mr="10px"
        _hover={{ textDecoration: 'none' }}
      >
        Minhas Contas
      </Link>
      <Spacer />
      <Menu>
        <MenuButton>
          <Flex alignItems="center">
            <Avatar user={userData} />
            <MdArrowDropDown size={24} />
          </Flex>
        </MenuButton>
        <MenuList color="black">
          <MenuItem>Configurações</MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleLogoutClick}>Sair</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default NavBar;
