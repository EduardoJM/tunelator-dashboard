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
import MailAccountsList from './MailAccountsList';

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

  const editMailModal = useDisclosure();
  const [editMailCurrent, setEditMailCurrent] = useState<UserMail | null>(null);

  const deleteMailModal = useDisclosure();
  const [deleteMailCurrent, setDeleteMailCurrent] =
    useState<UserMail | null>(null);

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

      <MailAccountsList
        onCreateUserMail={handleCreateUserMail}
        onEdit={handleEditUserMail}
        onDelete={handleCallDeleteUserMail}
        onToggleEnabledStatus={handleToggleEnabledStatus}
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
