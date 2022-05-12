import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { object, string, boolean } from 'yup';
import { useLoading } from '../../contexts/loading';
import { getErrorMessages } from '../../utils/errors';
import api from '../api/axios';
import { signup } from '../api/auth';
import { User } from '../../entities/User';

interface SignupMutationProps {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  remember: boolean;
  accept_terms: boolean;
}

const useSignupMutation = (setUserData: (user: User) => void) => {
  const { pushLoading, popLoading } = useLoading();
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation<unknown, unknown, SignupMutationProps>(
    async ({
      email,
      first_name,
      last_name,
      password,
      remember,
      accept_terms,
    }) => {
      pushLoading();

      try {
        const signupSchema = object({
          email: string()
            .email('Insira um e-mail válido.')
            .required('Insira um e-mail válido.'),
          password: string().required('Insira sua senha.'),
          first_name: string().required('Insira um nome válido.'),
          last_name: string().required('Insira um sobrenome válido.'),
          accept_terms: boolean()
            .required('Você precisa concordar com os termos de uso.')
            .isTrue('Você precisa concordar com os termos de uso.'),
        });

        const validatedData = signupSchema.validateSync({
          email,
          first_name,
          last_name,
          password,
          accept_terms,
        });

        const response = await signup(
          validatedData.email,
          validatedData.first_name,
          validatedData.last_name,
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
          title: 'Sucesso',
          description: 'Login efetuado com sucesso!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/', { replace: true });
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

export default useSignupMutation;
