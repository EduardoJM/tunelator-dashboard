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
import { useTranslation } from 'react-i18next';
import LoadingIndicatorBox from '@/components/Placeholders/LoadingIndicatorBox';
import Button from '@/components/Common/Button';
import { useMailAccountsPaginated } from '@/services/queries';
import {
  useSetMailAccountRedirectEnabledMutation,
  useDeleteMailAccountMutation,
} from '@/services/mutations';
import { usePlan } from '@/contexts/plan';
import { UserMail } from '@/entities/UserMail';
import { UserMailCreateModal, UserMailDeleteModal } from '@/components/Modals';
import { Pagination } from '@/components/Common';
import { DateTime } from '@/components/ValueFormat';
import NoAccountsBox from '@/components/Placeholders/NoAccountsBox';
import { WaitMailAccountDone } from '@/components/Features';

const MailAccounts: FC = () => {
  const { pageNumber } = useParams();

  const navigate = useNavigate();

  const { state } = useLocation();

  const queryClient = useQueryClient();

  const { plan } = usePlan();

  const { t } = useTranslation();

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
          {t('mailAccounts.title')}
        </Heading>

        {plan?.canCreateNewAccount() ? (
          <Button
            variant="primaryRounded"
            data-testid="create-new-account-button"
            onClick={handleCreateUserMail}
          >
            {t('mailAccounts.create')}
          </Button>
        ) : (
          <Tooltip
            hasArrow
            label={t('mailAccounts.noAccounts')}
            bg="brand.100"
            color="white"
            shouldWrapChildren
          >
            <Button
              variant="primaryRounded"
              data-testid="create-new-account-button"
              isDisabled={true}
            >
              {t('mailAccounts.create')}
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
                  <Text fontWeight="bold">
                    {t('mailAccounts.createdAtLabel')}
                  </Text>
                  <DateTime value={userMail.created_at} />
                </Box>
                <Divider />
                <Box width="100%">
                  <Text fontWeight="bold">
                    {t('mailAccounts.updatedAtLabel')}
                  </Text>
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
                      {t('mailAccounts.enabled')}
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
                      {t('mailAccounts.delete')}
                    </Button>
                  ) : (
                    <Tooltip
                      hasArrow
                      label={t('mailAccounts.noDeletePermission', {
                        days: plan?.days_until_user_can_delete_account,
                      })}
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
                        {t('mailAccounts.delete')}
                      </Button>
                    </Tooltip>
                  )}

                  <Button
                    variant="primary"
                    onClick={() => handleEditUserMail(userMail)}
                  >
                    {t('mailAccounts.edit')}
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

      <UserMailCreateModal
        isOpen={editMailModal.isOpen}
        onClose={editMailModal.onClose}
        userMail={editMailCurrent}
      />
      <UserMailDeleteModal
        isOpen={deleteMailModal.isOpen}
        onCancel={deleteMailModal.onClose}
        onConfirm={handleConfirmDeleteUserMail}
        account={deleteMailCurrent}
      />
    </>
  );
};

export default MailAccounts;
