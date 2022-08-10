import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return useMutation<unknown, unknown, ResetPasswordMutationProps>(
    async ({ password1, password2 }) => {
      if (!password1 || !password2 || password1 !== password2) {
        toast({
          title: t('errors.title'),
          description: t('errors.wrongchangepassword'),
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
          title: t('reset.success'),
          description: t('reset.message'),
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
