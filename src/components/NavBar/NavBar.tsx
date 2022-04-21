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
import { Link as RoutingLink, useLocation } from 'react-router-dom';
import Avatar from '../Avatar';
import { MdArrowDropDown } from 'react-icons/md';
import { useAuth } from '../../contexts/auth';

const NavBar: FC = () => {
  const { userData, logout } = useAuth();
  const { pathname } = useLocation();

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
      style={{
        position: 'sticky',
        left: 0,
        top: 0,
        zIndex: 500,
        boxShadow: '0 0 5px 3px rgba(0, 0, 0, 0.5)',
      }}
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
        mr="20px"
        fontWeight={pathname === '/' ? 'bold' : 'normal'}
        _hover={{ textDecoration: 'none' }}
      >
        Início
      </Link>
      <Link
        as={RoutingLink}
        to="/mails"
        fontWeight={pathname === '/mails' ? 'bold' : 'normal'}
        mr="20px"
        _hover={{ textDecoration: 'none' }}
      >
        Minhas Contas
      </Link>
      <Link mr="20px" _hover={{ textDecoration: 'none' }}>
        E-mails Recebidos
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
