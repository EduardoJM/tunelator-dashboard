import { useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useLoading } from '../../contexts/loading';
import { sendRecoveryEmail } from '../api/recovery';

interface SendRecoveryMailMutationProps {
  email: string;
}

const useSendRecoveryMailMutation = () => {
  const { pushLoading, popLoading } = useLoading();
  const toast = useToast();
  const { t } = useTranslation();

  return useMutation<unknown, unknown, SendRecoveryMailMutationProps>(
    async ({ email }) => {
      pushLoading();

      await sendRecoveryEmail(email);

      toast({
        title: t('alerts.recovery.success'),
        description: t('alerts.recovery.message'),
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      popLoading();
    }
  );
};

export default useSendRecoveryMailMutation;
