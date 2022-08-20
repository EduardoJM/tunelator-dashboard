import { FC } from 'react';
import {
  Flex,
  Spacer,
  Menu,
  MenuButton,
  MenuItem,
  MenuDivider,
  MenuList,
  Link,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  Link as RoutingLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import * as CSS from 'csstype';
import {
  MdArrowDropDown,
  MdMenu,
  MdLogout,
  MdAccountCircle,
} from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Avatar, Button } from '@/components/Common';
import SideNav from './SideNav';
import { useAuth } from '@/contexts/auth';

const NavBar: FC = () => {
  const { t } = useTranslation();
  const { userData, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const sideNavState = useDisclosure();
  const linksDisplay = useBreakpointValue({ base: 'none', md: 'block' });
  const drawerToggleDisplay = useBreakpointValue({ base: 'block', md: 'none' });
  const navBarFlexDirection = useBreakpointValue<CSS.Property.FlexDirection>({
    base: 'row-reverse',
    md: 'row',
  });
  const navBarPadding = useBreakpointValue({ base: '10px', md: '50px' });

  const handleLogoutClick = () => {
    logout();
  };

  const handleGoToProfile = () => {
    navigate('/customer/profile');
  };

  const handleOpenDrawer = () => {
    sideNavState.onOpen();
  };

  if (!userData) {
    return null;
  }

  return (
    <>
      <Flex
        width="100%"
        height="64px"
        backgroundColor="brand.500"
        color="white"
        flexDirection={navBarFlexDirection}
        alignItems="center"
        justifyContent="space-between"
        px={navBarPadding}
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

        <Button
          variant="fullGhost"
          display={drawerToggleDisplay}
          onClick={handleOpenDrawer}
        >
          <MdMenu size={24} />
        </Button>

        <Link
          as={RoutingLink}
          to="/"
          mr="20px"
          display={linksDisplay}
          fontWeight="bold"
          borderBottom={
            pathname === '/' ? '2px solid white' : '2px solid transparent'
          }
          _hover={{ textDecoration: 'none' }}
        >
          {t('navbar.home')}
        </Link>
        <Link
          as={RoutingLink}
          to="/mails"
          display={linksDisplay}
          fontWeight="bold"
          borderBottom={
            pathname.startsWith('/mails')
              ? '2px solid white'
              : '2px solid transparent'
          }
          mr="20px"
          _hover={{ textDecoration: 'none' }}
        >
          {t('navbar.accounts')}
        </Link>
        <Link
          as={RoutingLink}
          to="/received"
          mr="20px"
          display={linksDisplay}
          fontWeight="bold"
          borderBottom={
            pathname.startsWith('/received')
              ? '2px solid white'
              : '2px solid transparent'
          }
          _hover={{ textDecoration: 'none' }}
        >
          {t('navbar.received')}
        </Link>
        <Link
          as={RoutingLink}
          to="/plans"
          display={linksDisplay}
          fontWeight="bold"
          borderBottom={
            pathname === '/plans' ? '2px solid white' : '2px solid transparent'
          }
          mr="20px"
          _hover={{ textDecoration: 'none' }}
        >
          {t('navbar.plans')}
        </Link>
        <Spacer display={linksDisplay} />
        <Menu>
          <MenuButton display={linksDisplay}>
            <Flex alignItems="center">
              <Avatar user={userData} />
              <MdArrowDropDown size={24} />
            </Flex>
          </MenuButton>
          <MenuList color="black">
            <MenuItem
              icon={<MdAccountCircle size="24px" />}
              onClick={handleGoToProfile}
            >
              {t('navbar.profile')}
            </MenuItem>
            <MenuDivider />
            <MenuItem
              icon={<MdLogout size="24px" />}
              onClick={handleLogoutClick}
            >
              {t('navbar.logout')}
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <SideNav onClose={sideNavState.onClose} isOpen={sideNavState.isOpen} />
    </>
  );
};

export default NavBar;
