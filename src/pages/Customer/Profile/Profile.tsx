import { FC, useEffect } from 'react';
import { Box, Heading, Flex, Alert, AlertIcon } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { Button, Input, LoadingIndicatorBox } from '../../../components';
import { useAuth } from '../../../contexts/auth';
import { useAuthenticatedUser } from '../../../services/queries';
import { useUpdateUserDataMutation } from '../../../services/mutations';

const Profile: FC = () => {
  const { loggedIn, setUserData } = useAuth();
  const updateUserData = useUpdateUserDataMutation(setUserData);
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
    },
    onSubmit: data => updateUserData.mutate(data),
  });
  const { data, isLoading } = useAuthenticatedUser();

  useEffect(() => {
    formik.setValues({
      first_name: data?.first_name || '',
      last_name: data?.last_name || '',
    });
  }, [data]);

  if (!loggedIn) {
    return null;
  }

  if (isLoading) {
    return <LoadingIndicatorBox />;
  }

  return (
    <Box py="50px">
      <Heading as="h1" size="lg" mb="30px">
        Profile Name
      </Heading>

      <Alert status="info" mb="30">
        <AlertIcon />
        Por enquanto, apenas algumas informações estão disponíveis. Estamos
        trabalhando para melhorar a customização da nossa plataforma para você
        =)
      </Alert>

      <Box
        bgColor="#FEFEFE"
        _hover={{ bgColor: '#EFEFEF' }}
        p="10px"
        borderRadius="5px"
      >
        <Heading as="h2" size="md" mb="15px">
          Dados Pessoais
        </Heading>

        <form name="profile-data" onSubmit={formik.handleSubmit}>
          <Flex gap="10px" mb="20px">
            <Input
              type="text"
              label="Nome"
              id="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
            />
            <Input
              type="text"
              label="Sobrenome"
              id="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
            />
          </Flex>

          <Flex justifyContent="flex-end">
            <Button variant="primaryRounded" type="submit">
              Salvar
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default Profile;
