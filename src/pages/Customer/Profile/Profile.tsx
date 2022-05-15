import { FC, useEffect, useMemo } from 'react';
import { Box, Heading, Flex, useBreakpointValue } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as CSS from 'csstype';
import { Button, Input, LoadingIndicatorBox } from '../../../components';
import { useAuth } from '../../../contexts/auth';
import { useAuthenticatedUser } from '../../../services/queries';
import { useUpdateUserDataMutation } from '../../../services/mutations';

const Profile: FC = () => {
  const { setUserData } = useAuth();
  const updateUserData = useUpdateUserDataMutation(setUserData);
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
    },
    onSubmit: data => updateUserData.mutate(data),
  });
  const { data, isLoading } = useAuthenticatedUser();
  const displayHeading = useMemo(() => {
    if (!data?.first_name) {
      return data?.email;
    }
    if (!data.last_name) {
      return data.first_name;
    }
    return `${data.first_name} ${data.last_name}`;
  }, [data]);

  const flexDirection = useBreakpointValue<CSS.Property.FlexDirection>({
    base: 'column',
    md: 'row',
  });

  useEffect(() => {
    formik.setValues({
      first_name: data?.first_name || '',
      last_name: data?.last_name || '',
    });
  }, [data]);

  return (
    <>
      {isLoading ? (
        <LoadingIndicatorBox />
      ) : (
        <Box py="50px">
          <Heading as="h1" size="lg" mb="30px">
            {displayHeading}
          </Heading>

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
              <Flex gap="10px" mb="20px" flexDir={flexDirection}>
                <Input
                  type="text"
                  label="Nome"
                  id="first_name"
                  data-testid="first-name-field"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                />
                <Input
                  type="text"
                  label="Sobrenome"
                  id="last_name"
                  data-testid="last-name-field"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                />
              </Flex>

              <Flex justifyContent="flex-end" flexDir={flexDirection}>
                <Button
                  variant="primaryRounded"
                  type="submit"
                  data-testid="submit-button"
                >
                  Salvar
                </Button>
              </Flex>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Profile;
