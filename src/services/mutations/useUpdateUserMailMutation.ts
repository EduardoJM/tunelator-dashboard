import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { object, string, boolean } from 'yup';
import { useLoading } from '../../contexts/loading';
import { getErrorMessages } from '../../utils/errors';
import { updateMailAccount } from '../api/mailAccounts';

interface UpdateUserMailMutationProps {
  id: number;
  name: string;
  mail_user: string;
  redirect_enabled: boolean;
  redirect_to_my_email: boolean;
  redirect_to: string;
}

const useUpdateUserMailMutation = (onClose?: () => void) => {
  const queryClient = useQueryClient();
  const { pushLoading, popLoading } = useLoading();
  const toast = useToast();

  return useMutation<unknown, unknown, UpdateUserMailMutationProps>(
    async ({
      id,
      name,
      mail_user,
      redirect_enabled,
      redirect_to_my_email,
      redirect_to,
    }) => {
      pushLoading();

      try {
        const createOrEditMailSchema = object({
          name: string().required('Insira um nome válido.'),
          mail_user: string().required(),
          redirect_enabled: boolean().required(),
          redirect_to_my_email: boolean().required(),
          redirect_to: string().optional().email('Insira um e-mail válido'),
        });

        createOrEditMailSchema.validateSync({
          name,
          mail_user,
          redirect_enabled,
          redirect_to_my_email,
          redirect_to,
        });

        await updateMailAccount(
          id,
          name,
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

export default useUpdateUserMailMutation;
