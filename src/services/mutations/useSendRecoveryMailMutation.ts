import { useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { useLoading } from '../../contexts/loading';
import { sendRecoveryEmail } from '../api/recovery';

interface SendRecoveryMailMutationProps {
  email: string;
}

const useSendRecoveryMailMutation = () => {
  const { pushLoading, popLoading } = useLoading();
  const toast = useToast();

  return useMutation<unknown, unknown, SendRecoveryMailMutationProps>(
    async ({ email }) => {
      pushLoading();

      await sendRecoveryEmail(email);

      toast({
        title: 'Sucesso',
        description:
          'Se o e-mail estiver associado a uma conta ao Tunelator, um e-mail será enviado para resetar a senha!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      popLoading();
    }
  );
};

export default useSendRecoveryMailMutation;
