import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { object, string, boolean } from 'yup';
import { useLoading } from '../../contexts/loading';
import { getErrorMessages } from '../../utils/errors';
import { createMailAccount } from '../api/mailAccounts';

interface CreateUserMailMutationProps {
  name: string;
  mail_user: string;
  redirect_enabled: boolean;
  redirect_to_my_email: boolean;
  redirect_to: string;
}

const useCreateUserMailMutation = (onClose?: () => void) => {
  const queryClient = useQueryClient();
  const { pushLoading, popLoading } = useLoading();
  const toast = useToast();
  const { t } = useTranslation();

  return useMutation<unknown, unknown, CreateUserMailMutationProps>(
    async ({
      name,
      mail_user,
      redirect_enabled,
      redirect_to_my_email,
      redirect_to,
    }) => {
      pushLoading();

      try {
        const createOrEditMailSchema = object({
          name: string().required(t('errors.wrongname')),
          mail_user: string().required(),
          redirect_enabled: boolean().required(),
          redirect_to_my_email: boolean().required(),
          redirect_to: string().optional().email(t('errors.wrongemail')),
        });

        createOrEditMailSchema.validateSync({
          name,
          mail_user,
          redirect_enabled,
          redirect_to_my_email,
          redirect_to,
        });

        await createMailAccount(
          name,
          mail_user,
          redirect_enabled,
          !redirect_to_my_email ? redirect_to || null : null
        );

        queryClient.invalidateQueries(['mails']);
        queryClient.refetchQueries(['mails']);
        queryClient.invalidateQueries('latest-mails');
        queryClient.refetchQueries('latest-mails');

        if (!!onClose) {
          onClose();
        }
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
    }
  );
};

export default useCreateUserMailMutation;
