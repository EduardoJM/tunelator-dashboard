import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useLoading } from '../../contexts/loading';
import { resendReceivedMail } from '../api/receivedMails';
import { getErrorMessages } from '../../utils/errors';

interface ResendReceivedMailMutationProps {
  id: number;
}

const useResendReceivedMailMutation = (callback: () => void) => {
  const { pushLoading, popLoading } = useLoading();
  const toast = useToast();

  return useMutation<unknown, unknown, ResendReceivedMailMutationProps>(
    async ({ id }) => {
      pushLoading();

      try {
        await resendReceivedMail(id);

        callback();
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

export default useResendReceivedMailMutation;
