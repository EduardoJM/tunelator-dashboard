import { FC, useMemo } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Flex,
  Heading,
  VStack,
  Divider,
  Text,
} from '@chakra-ui/react';
import {
  MdHome,
  MdEmail,
  MdLogout,
  MdArrowBack,
  MdAccountCircle,
} from 'react-icons/md';
import { GoMailRead } from 'react-icons/go';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../Avatar';
import Button from '../../Common/Button';
import { useAuth } from '../../../contexts/auth';

export interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideNav: FC<SideNavProps> = ({ isOpen, onClose }) => {
  const { userData, logout } = useAuth();

  const navigate = useNavigate();

  const displayUserName = useMemo(() => {
    if (!userData) {
      return '';
    }
    let name = userData.email;
    if (!!userData.first_name) {
      name = userData.first_name;
      if (!!userData.last_name) {
        name = `${name} ${userData.last_name}`;
      }
    }
    return name;
  }, [userData]);

  const displayUserEmail = useMemo(() => {
    if (!userData) {
      return '';
    }
    if (!!userData.first_name) {
      return userData.email;
    }
    return '';
  }, [userData]);

  const handleGoToHome = () => {
    navigate('/');
    onClose();
  };

  const handleGoToMailAccounts = () => {
    navigate('/mails');
    onClose();
  };

  const handleGoToPlans = () => {
    navigate('/plans');
    onClose();
  };

  const handleGoToReceivedMails = () => {
    navigate('/received');
    onClose();
  };

  const handleGoToProfile = () => {
    navigate('/customer/profile');
    onClose();
  };

  if (!userData) {
    return null;
  }

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader backgroundColor="brand.500">
          <Flex>
            <Avatar user={userData} />
            <VStack ml="10px" flex="1" width="100%" overflow="hidden">
              <Heading
                as="h6"
                size="md"
                fontWeight="bold"
                color="white"
                width="100%"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {displayUserName}
              </Heading>
              {!!displayUserEmail && (
                <Heading
                  as="h6"
                  size="xs"
                  fontWeight="normal"
                  color="white"
                  width="100%"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {displayUserEmail}
                </Heading>
              )}
            </VStack>
          </Flex>
        </DrawerHeader>

        <DrawerBody>
          <VStack width="100%">
            <Button variant="sidenavButton" onClick={handleGoToHome}>
              <MdHome size="20px" />
              <Text ml="10px">Início</Text>
            </Button>
            <Button variant="sidenavButton" onClick={handleGoToMailAccounts}>
              <MdEmail size="20px" />
              <Text ml="10px">Minhas Contas</Text>
            </Button>
            <Button variant="sidenavButton" onClick={handleGoToReceivedMails}>
              <GoMailRead size="20px" />
              <Text ml="10px">E-mails Recebidos</Text>
            </Button>
            <Button variant="sidenavButton" onClick={handleGoToPlans}>
              <FaRegMoneyBillAlt size="20px" />
              <Text ml="10px">Planos e Assinatura</Text>
            </Button>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <VStack width="100%">
            <Divider />
            <Button variant="sidenavButton" onClick={handleGoToProfile}>
              <MdAccountCircle size="20px" />
              <Text ml="10px">Editar Perfil</Text>
            </Button>
            <Button variant="sidenavButton" onClick={logout}>
              <MdLogout size="20px" />
              <Text ml="10px">Sair</Text>
            </Button>
            <Divider />
            <Button variant="sidenavButton" onClick={onClose}>
              <MdArrowBack size="20px" />
              <Text ml="10px">Voltar</Text>
            </Button>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SideNav;
