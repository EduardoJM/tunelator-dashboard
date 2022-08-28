import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';
import { useLoading } from '../../contexts/loading';
import { getErrorMessages } from '../../utils/errors';
import { updateUserData } from '../api/auth';

interface ChangePasswordProps {
  password: string;
  confirmation: string;
}

const useUpdateUserPasswordMutation = () => {
  const { pushLoading, popLoading } = useLoading();
  const toast = useToast();
  const { t } = useTranslation();

  return useMutation<unknown, unknown, ChangePasswordProps>(
    async ({ password, confirmation }) => {
      if (!password || !confirmation || password !== confirmation) {
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
        await updateUserData({
          password,
        });

        toast({
          title: t('alerts.userupdate.success'),
          description: t('alerts.userupdate.message'),
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
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

export default useUpdateUserPasswordMutation;
