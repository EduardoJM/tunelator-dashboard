import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { setMailAccountRedirectEnabled } from '../api/mailAccounts';
import { useLoading } from '../../contexts/loading';
import { getErrorMessages } from '../../utils/errors';

interface MailAccountRedirectEnabledMutationProps {
  id: number;
  enabled: boolean;
}

const useSetMailAccountRedirectEnabledMutation = () => {
  const queryClient = useQueryClient();
  const { pushLoading, popLoading } = useLoading();
  const toast = useToast();

  return useMutation<unknown, unknown, MailAccountRedirectEnabledMutationProps>(
    async ({ id, enabled }) => {
      pushLoading();

      try {
        await setMailAccountRedirectEnabled(id, enabled);
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
    }
  );
};

export default useSetMailAccountRedirectEnabledMutation;
