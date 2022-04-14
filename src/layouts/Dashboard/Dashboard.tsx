import { FC } from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  Spacer,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuDivider,
  MenuList,
} from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";
import { useAuth } from "../../contexts/auth";
import Avatar from "../../components/Avatar";

const Dashboard: FC = ({ children }) => {
  const { logout, userData } = useAuth();

  function handleLogoutClick() {
    logout();
  }

  if (!userData) {
    return null;
  }

  return (
    <Box width="100%">
      <VStack width="100%">
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
      </VStack>

      <Box width="100%">{children}</Box>
    </Box>
  );
};

export default Dashboard;
