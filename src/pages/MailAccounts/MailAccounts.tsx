import { FC, useEffect, useMemo, useState } from 'react';
import {
  Heading,
  Flex,
  VStack,
  Box,
  Text,
  Divider,
  FormControl,
  FormLabel,
  Switch,
  Tooltip,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useQueryClient } from 'react-query';
import * as CSS from 'csstype';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import LoadingIndicatorBox from '@/components/Placeholders/LoadingIndicatorBox';
import Button from '@/components/Common/Button';
import { useMailAccountsPaginated } from '@/services/queries';
import {
  useSetMailAccountRedirectEnabledMutation,
  useDeleteMailAccountMutation,
} from '@/services/mutations';
import { usePlan } from '@/contexts/plan';
import { UserMail } from '@/entities/UserMail';
import UserMailModal from '@/modals/UserMailModal';
import UserMailDeleteModal from '@/modals/UserMailDeleteModal';
import { DateTime, Pagination } from '@/components';
import NoAccountsBox from '@/components/Placeholders/NoAccountsBox';
import { WaitMailAccountDone } from '@/components';

const MailAccounts: FC = () => {
  const { pageNumber } = useParams();

  const navigate = useNavigate();

  const { state } = useLocation();

  const queryClient = useQueryClient();

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

  const { data, error, isLoading } = useMailAccountsPaginated(currentPage);

  const editMailModal = useDisclosure();
  const [editMailCurrent, setEditMailCurrent] = useState<UserMail | null>(null);

  const deleteMailModal = useDisclosure();
  const [deleteMailCurrent, setDeleteMailCurrent] =
    useState<UserMail | null>(null);

  const accountCardActionsDirection =
    useBreakpointValue<CSS.Property.FlexDirection>({
      base: 'column',
      md: 'row',
    });

  const accountCardActionsAlign = useBreakpointValue<CSS.Property.AlignItems>({
    base: 'stretch',
    md: 'center',
  });

  const setMailAccountRedirectEnabledMutation =
    useSetMailAccountRedirectEnabledMutation();

  const deleteMailAccountMutation = useDeleteMailAccountMutation();

  useEffect(() => {
    if (!state) {
      return;
    }
    if (!!(state as any)?.openCreateModal) {
      setEditMailCurrent(null);
      editMailModal.onOpen();
    }
  }, [state]);

  const handleToggleEnabledStatus = async (mail: UserMail) => {
    setMailAccountRedirectEnabledMutation.mutate({
      id: mail.id,
      enabled: !mail.redirect_enabled,
    });
  };

  const handleNavigateToPage = (page: number) => {
    navigate(`/mails/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditUserMail = (userMail: UserMail) => {
    setEditMailCurrent(userMail);
    editMailModal.onOpen();
  };

  const handleCreateUserMail = () => {
    setEditMailCurrent(null);
    editMailModal.onOpen();
  };

  const handleCallDeleteUserMail = (userMail: UserMail) => {
    setDeleteMailCurrent(userMail);
    deleteMailModal.onOpen();
  };

  const handleConfirmDeleteUserMail = async () => {
    deleteMailModal.onClose();
    if (!deleteMailCurrent) {
      return;
    }

    deleteMailAccountMutation.mutate({ id: deleteMailCurrent.id });

    queryClient.refetchQueries(['mails', currentPage]);
  };

  const handleRefreshPageAndLatest = () => {
    queryClient.invalidateQueries(['mails']);
    queryClient.invalidateQueries('latest-mails');
    queryClient.refetchQueries('latest-mails');
    queryClient.refetchQueries(['mails', currentPage]);
  };

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h1" size="lg" my="50px" fontWeight="bold">
          Minhas Contas de E-mail
        </Heading>

        {plan?.canCreateNewAccount() ? (
          <Button
            variant="primaryRounded"
            data-testid="create-new-account-button"
            onClick={handleCreateUserMail}
          >
            Criar Nova
          </Button>
        ) : (
          <Tooltip
            hasArrow
            label="Ops, suas contas disponíveis acabaram! Você poder ver se algum dos nossos planos lhe atende melhor ou entrar em contato com o suporte."
            bg="brand.100"
            color="white"
            shouldWrapChildren
          >
            <Button
              variant="primaryRounded"
              data-testid="create-new-account-button"
              isDisabled={true}
            >
              Criar Nova
            </Button>
          </Tooltip>
        )}
      </Flex>

      {isLoading ? (
        <LoadingIndicatorBox />
      ) : (
        <VStack width="100%" spacing="25px">
          {data?.results.length === 0 && (
            <Flex
              width="100%"
              minHeight="400px"
              alignItems="center"
              mt="60px"
              backgroundColor="#EFEFEF"
              boxShadow="md"
              borderRadius="10px"
            >
              <NoAccountsBox
                createFirstButtonVisible
                onCreateFirstClick={handleCreateUserMail}
              />
            </Flex>
          )}
          {data?.results.map(userMail => (
            <Box
              key={userMail.id}
              data-testid="mail-account-card"
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
                {!!userMail.mail ? (
                  <Box width="100%">
                    <Text mb="10px">{userMail.mail}</Text>
                  </Box>
                ) : (
                  <Box width="100%">
                    <WaitMailAccountDone
                      accountId={userMail.id}
                      onAccountIsDone={handleRefreshPageAndLatest}
                    />
                  </Box>
                )}
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
                  flexDirection={accountCardActionsDirection}
                  alignItems={accountCardActionsAlign}
                  justifyContent="space-between"
                  py="5px"
                  gap="10px"
                >
                  <FormControl flex="1" display="flex" alignItems="center">
                    <FormLabel htmlFor={`email-${userMail.id}-enabled`} mb="0">
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
                    <Button
                      onClick={() => handleCallDeleteUserMail(userMail)}
                      variant="destroy"
                    >
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
                      <Button
                        w="100%"
                        variant="destroy"
                        mr="10px"
                        isDisabled={true}
                      >
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

      <Pagination
        totalCount={data?.count || 0}
        currentPage={currentPage}
        onGoToPage={handleNavigateToPage}
        itemsPerPage={5}
      />

      <Box mt="100px" />

      <UserMailModal
        isOpen={editMailModal.isOpen}
        onClose={editMailModal.onClose}
        userMail={editMailCurrent}
      />
      <UserMailDeleteModal
        isOpen={deleteMailModal.isOpen}
        onCancel={deleteMailModal.onClose}
        onConfirm={handleConfirmDeleteUserMail}
      />
    </>
  );
};

export default MailAccounts;
