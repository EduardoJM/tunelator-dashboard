import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../contexts/loading';
import { getErrorMessages } from '../../utils/errors';
import { resetPassword } from '../api/recovery';

interface ResetPasswordMutationProps {
  password1: string;
  password2: string;
}

const useResetPasswordMutation = (id: string) => {
  const { pushLoading, popLoading } = useLoading();
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation<unknown, unknown, ResetPasswordMutationProps>(
    async ({ password1, password2 }) => {
      if (!password1 || !password2 || password1 !== password2) {
        toast({
          title: 'Erro!',
          description: 'Preencha e confirme a sua nova senha!',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      pushLoading();

      try {
        await resetPassword(id, password1);

        toast({
          title: 'Sucesso',
          description:
            'Senha alterada com sucesso! Faça login para continuar...',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/');
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

export default useResetPasswordMutation;
