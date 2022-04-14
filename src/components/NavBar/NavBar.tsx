import { FC } from "react";
import {
  Flex,
  Text,
  Spacer,
  Menu,
  MenuButton,
  MenuItem,
  MenuDivider,
  MenuList,
} from "@chakra-ui/react";
import Avatar from "../Avatar";
import { MdArrowDropDown } from "react-icons/md";
import { useAuth } from "../../contexts/auth";

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
      <Text fontWeight="bold">TUNELATOR</Text>
      <Spacer />
      AAAA
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
