import { FC, useMemo, useState } from 'react';
import {
  Container,
  Heading,
  Flex,
  ButtonGroup,
  Button as ChakraButton,
  VStack,
  Box,
  Text,
  Divider,
  FormControl,
  FormLabel,
  Switch,
  Tooltip,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { useQuery, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingIndicatorBox from '../../components/LoadingIndicatorBox';
import Button from '../../components/Button';
import {
  getMailsPaginated,
  setMailRedirectEnabled,
} from '../../services/mails';
import { getErrorMessages } from '../../utils/errors';
import { useLoading } from '../../contexts/loading';
import { usePlan } from '../../contexts/plan';
import { UserMail } from '../../entities/UserMail';
import UserMailModal from '../../modals/UserMailModal';
import DateTime from '../../components/DateTime';

const MailAccounts: FC = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { plan } = usePlan();
  const currentPage = useMemo(() => {
    if (!pageNumber) {
      return 1;
    }
    const num = parseInt(pageNumber, 10);
    if (Number.isNaN(num)) {
      return 1;
    }
    return num;
  }, [pageNumber]);
  const { data, error, isLoading } = useQuery(['mails', currentPage], () =>
    getMailsPaginated(currentPage)
  );
  const pagination = useMemo(() => {
    if (!data) {
      return null;
    }
    const length = Math.ceil(data.count / 5);
    return Array.from({ length }).map((_, index) => index + 1);
  }, [data]);
  const { pushLoading, popLoading } = useLoading();

  const editMailModal = useDisclosure();
  const [editMailCurrent, setEditMailCurrent] = useState<UserMail | null>(null);

  const handleToggleEnabledStatus = async (mail: UserMail) => {
    pushLoading();
    try {
      await setMailRedirectEnabled(mail.id, !mail.redirect_enabled);
      queryClient.invalidateQueries(['mails']);
      queryClient.invalidateQueries('latest-mails');
      queryClient.refetchQueries('latest-mails');
    } catch (err) {
      getErrorMessages(err).forEach(error => {
        toast({
          title: error.title,
          description: error.text,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
    }
    popLoading();
  };

  const handleNavigateToPage = (page: number) => {
    navigate(`/mails/${page}`);
  };

  const handleEditUserMail = (userMail: UserMail) => {
    setEditMailCurrent(userMail);
    editMailModal.onOpen();
  };

  const handleCreateUserMail = () => {
    setEditMailCurrent(null);
    editMailModal.onOpen();
  };

  return (
    <>
      <Container maxW="120ch">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading as="h1" size="lg" my="50px" fontWeight="bold">
            Minhas Contas de E-mail
          </Heading>

          <Button variant="primary-rounded" onClick={handleCreateUserMail}>
            Criar Nova
          </Button>
        </Flex>

        {isLoading ? (
          <LoadingIndicatorBox />
        ) : (
          <VStack width="100%" spacing="25px">
            {data?.results.map(userMail => (
              <Box
                key={userMail.id}
                width="100%"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="5px"
                p="20px"
                _hover={{ backgroundColor: 'gray.50' }}
              >
                <VStack width="100%">
                  <Heading width="100%" as="h2" size="md" fontWeight="bold">
                    {userMail.name}
                  </Heading>
                  <Box width="100%">
                    <Text mb="10px">{userMail.mail}</Text>
                  </Box>
                  <Divider />
                  <Box width="100%">
                    <Text fontWeight="bold">Criado em</Text>
                    <DateTime value={userMail.created_at} />
                  </Box>
                  <Divider />
                  <Box width="100%">
                    <Text fontWeight="bold">Última Atualização</Text>
                    <DateTime value={userMail.updated_at} />
                  </Box>
                  <Divider />
                  <Flex
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    py="5px"
                  >
                    <FormControl display="flex" alignItems="center">
                      <FormLabel
                        htmlFor={`email-${userMail.id}-enabled`}
                        mb="0"
                      >
                        Habilitado?
                      </FormLabel>
                      <Switch
                        id={`email-${userMail.id}-enabled`}
                        colorScheme="brand"
                        defaultChecked={userMail.redirect_enabled}
                        onChange={() => handleToggleEnabledStatus(userMail)}
                      />
                    </FormControl>

                    {plan?.canDeleteUserMail(userMail) ? (
                      <Button variant="destroy" mr="10px">
                        Deletar Conta
                      </Button>
                    ) : (
                      <Tooltip
                        hasArrow
                        label={`Você só pode deletar essa conta depois de ${plan?.days_until_user_can_delete_account} dia(s).`}
                        bg="brand.100"
                        color="white"
                        shouldWrapChildren
                      >
                        <Button variant="destroy" mr="10px" isDisabled={true}>
                          Deletar Conta
                        </Button>
                      </Tooltip>
                    )}

                    <Button
                      variant="primary"
                      onClick={() => handleEditUserMail(userMail)}
                    >
                      Editar
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            ))}
          </VStack>
        )}
        {!!pagination && (
          <Flex alignItems="center" justifyContent="end" mt="50px">
            <ButtonGroup size="sm" isAttached variant="outline">
              {pagination.map(page => (
                <ChakraButton
                  key={page}
                  mr="-px"
                  onClick={() => handleNavigateToPage(page)}
                  colorScheme="brand"
                  isActive={page == currentPage}
                  _active={{
                    backgroundColor: 'brand.500',
                    color: 'white',
                    borderColor: 'brand.500',
                    borderWidth: '1px',
                  }}
                >
                  {page}
                </ChakraButton>
              ))}
            </ButtonGroup>
          </Flex>
        )}
      </Container>

      <Box mt="100px" />

      <UserMailModal
        isOpen={editMailModal.isOpen}
        onClose={editMailModal.onClose}
        userMail={editMailCurrent}
      />
    </>
  );
};

export default MailAccounts;
