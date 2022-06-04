import { FC, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router';
import { GiBackwardTime } from 'react-icons/gi';
import { useFormik } from 'formik';
import { useLoading } from '../../contexts/loading';
import { isSessionValid } from '../../services/api/recovery';
import { Button, PasswordInput } from '../../components';
import { useResetPasswordMutation } from '../../services/mutations';

const RecoveryReset: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pushLoading, popLoading } = useLoading();
  const [valid, setValid] = useState(true);
  const boxWidth = useBreakpointValue({ base: '100%', md: '50%' });

  const resetPasswordMutation = useResetPasswordMutation(id || '');

  const formik = useFormik({
    initialValues: {
      password1: '',
      password2: '',
    },
    onSubmit: data => resetPasswordMutation.mutate(data),
  });

  useEffect(() => {
    const checkSession = async () => {
      if (!id) {
        setValid(false);
        return;
      }

      pushLoading();

      const sessionValid = await isSessionValid(id);
      setValid(sessionValid);

      popLoading();
    };

    checkSession();
  }, [id]);

  const handleGoToPasswordRecovery = () => {
    navigate('/recovery');
  };

  if (!valid) {
    return (
      <Flex h="100%" flexDir="column" alignItems="stretch">
        <Flex flex="1" alignItems="stretch" flexWrap="wrap-reverse">
          <Flex
            w={boxWidth}
            alignItems="stretch"
            justifyContent="center"
            flexDir="column"
          >
            <Heading as="h1" size="xl" color="brand.500">
              Esse link expirou...
            </Heading>
            <Heading
              as="h2"
              size="md"
              mt="50px"
              color="brand.500"
              fontWeight="normal"
            >
              Esse link expirou ou não é válido. Para recuperar a sua senha você
              precisa pedir um novo link.
            </Heading>
          </Flex>
          <Flex
            width={boxWidth}
            alignItems="center"
            justifyContent="center"
            color="brand.500"
          >
            <GiBackwardTime size="200px" />
          </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="center" pt="20px" pb="60px">
          <Button onClick={handleGoToPasswordRecovery} variant="primaryRounded">
            Recuperar Senha
          </Button>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex minHeight="100vh" width="100%">
      <Box backgroundColor="white" flex="1">
        <Flex
          width="100%"
          minHeight="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p="10px"
        >
          <Box
            data-testid="login-box"
            width="100%"
            maxWidth="450px"
            color="foreground.muted"
          >
            <form name="reset-form" onSubmit={formik.handleSubmit}>
              <VStack>
                <Heading
                  width="100%"
                  color="foreground.default"
                  as="h1"
                  size="2xl"
                >
                  Redefinir Senha
                </Heading>

                <Box pb="20px">
                  <Text>
                    Preencha e confirme uma nova senha para a sua conta.
                  </Text>
                </Box>

                <PasswordInput
                  id="password1"
                  label="Sua Senha"
                  data-testid="password1-field"
                  placeholder="Digite sua nova senha"
                  value={formik.values.password1}
                  onChange={formik.handleChange}
                />

                <PasswordInput
                  id="password2"
                  label="Confirme sua Senha"
                  data-testid="password2-field"
                  placeholder="Confirme sua nova senha"
                  value={formik.values.password2}
                  onChange={formik.handleChange}
                />

                <Button
                  width="100%"
                  variant="primaryRounded"
                  type="submit"
                  data-testid="submit-button"
                >
                  Redefinir Senha
                </Button>
              </VStack>
            </form>
          </Box>
        </Flex>
      </Box>
      <Box
        backgroundColor="brand.500"
        flex="1"
        display={{
          base: 'none',
          lg: 'block',
        }}
      ></Box>
    </Flex>
  );
};

export default RecoveryReset;
