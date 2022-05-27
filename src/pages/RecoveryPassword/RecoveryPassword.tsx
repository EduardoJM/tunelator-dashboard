import { FC } from 'react';
import { Flex, Box, VStack, Text, Heading } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { Input, Button } from '../../components';
import { useSendRecoveryMailMutation } from '../../services/mutations';

const RecoveryPassword: FC = () => {
  const sendRecoveryMailMutation = useSendRecoveryMailMutation();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: ({ email }) => sendRecoveryMailMutation.mutate({ email }),
  });

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
            <form name="recovery-form" onSubmit={formik.handleSubmit}>
              <VStack>
                <Heading
                  width="100%"
                  color="foreground.default"
                  as="h1"
                  size="2xl"
                >
                  Recuperar Senha
                </Heading>

                <Box pb="20px">
                  <Text>
                    Envie um e-mail para recuperar a sua senha de acesso ao
                    Tunelator para continuar cuidando da sua caixa de e-mails.
                  </Text>
                </Box>

                <Input
                  id="email"
                  label="E-mail"
                  placeholder="exemplo@exemplo.com.br"
                  data-testid="email-field"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />

                <Flex w="100%" pt="25px" flexDir="column" alignItems="stretch">
                  <Button
                    type="submit"
                    data-testid="submit-button"
                    variant="primaryRounded"
                  >
                    Resetar Senha
                  </Button>
                </Flex>
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

export default RecoveryPassword;
