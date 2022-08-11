import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { object, string, boolean } from 'yup';
import { useLoading } from '../../contexts/loading';
import { getErrorMessages } from '../../utils/errors';
import api from '../api/axios';
import { login } from '../api/auth';
import { User } from '../../entities/User';

interface LoginMutationProps {
  email: string;
  password: string;
  remember: boolean;
  from: string;
}

const useLoginMutation = (setUserData: (user: User) => void) => {
  const { pushLoading, popLoading } = useLoading();
  const toast = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation<unknown, unknown, LoginMutationProps>(
    async ({ email, password, remember, from }) => {
      pushLoading();

      try {
        const loginSchema = object({
          email: string()
            .email(t('errors.wrongemail'))
            .required(t('errors.wrongemail')),
          password: string().required(t('errors.wrongpassword')),
          remember: boolean().required(),
        });

        const validatedData = loginSchema.validateSync({
          email,
          password,
          remember,
        });

        const response = await login(
          validatedData.email,
          validatedData.password
        );

        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.access}`;

        setUserData(response.user);

        if (remember) {
          localStorage.setItem('@TUNELATOR_REFRESH', response.refresh);
        } else {
          sessionStorage.setItem('@TUNELATOR_REFRESH', response.refresh);
        }

        toast({
          title: t('alerts.login.success'),
          description: t('alerts.login.message'),
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate(from, { replace: true });
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

export default useLoginMutation;
