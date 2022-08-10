import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';
import { useLoading } from '../../contexts/loading';
import { getErrorMessages } from '../../utils/errors';
import { updateUserData } from '../api/auth';
import { User } from '../../entities/User';

interface SignupMutationProps {
  first_name: string;
  last_name: string;
}

const useUpdateUserDataMutation = (setUserData: (user: User) => void) => {
  const { pushLoading, popLoading } = useLoading();
  const toast = useToast();
  const { t } = useTranslation();

  return useMutation<unknown, unknown, SignupMutationProps>(
    async ({ first_name, last_name }) => {
      pushLoading();

      try {
        const userUpdateSchema = object({
          first_name: string().required(t('errors.wrongname')),
          last_name: string().required(t('errors.wronglastname')),
        });

        const validatedData = userUpdateSchema.validateSync({
          first_name,
          last_name,
        });

        const response = await updateUserData({
          first_name: validatedData.first_name,
          last_name: validatedData.last_name,
        });

        setUserData(response);

        toast({
          title: t('userupdate.success'),
          description: t('userupdate.message'),
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

export default useUpdateUserDataMutation;
