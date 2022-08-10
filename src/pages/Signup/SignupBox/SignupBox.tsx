import { ChangeEvent, FC } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Flex,
  Link,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuth } from '../../../contexts/auth';
import { Button, Input, PasswordInput, Checkbox } from '../../../components';
import { TermsOfUseModal } from '../../../modals';

const SignupBox: FC = () => {
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      accept_terms: false,
      remember: true,
    },
    onSubmit: ({
      email,
      first_name,
      last_name,
      password,
      remember,
      accept_terms,
    }) => {
      auth.signup({
        email,
        first_name,
        last_name,
        password,
        remember,
        accept_terms,
      });
    },
  });

  const modal = useDisclosure();

  const handleCancelTerms = () => {
    modal.onClose();
  };

  const handleConfirmTerms = () => {
    modal.onClose();
    formik.setFieldValue('accept_terms', true);
  };

  const handleTermsCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (formik.values.accept_terms) {
      formik.handleChange(e);
      return;
    }
    e.preventDefault();
    modal.onOpen();
  };

  return (
    <>
      <Box
        data-testid="signup-box"
        width="100%"
        maxWidth="450px"
        color="foreground.muted"
      >
        <form name="signup-form" onSubmit={formik.handleSubmit}>
          <VStack>
            <Heading width="100%" color="foreground.default" as="h1" size="2xl">
              Criar Conta
            </Heading>

            <Box pb="20px">
              <Text>
                A um passo de não precisar mais se descadastrar inúmeras vezes
                da mesma lista de e-mail.
              </Text>
            </Box>

            <Input
              id="email"
              label="E-mail"
              data-testid="email-field"
              placeholder="exemplo@exemplo.com.br"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <Input
              id="first_name"
              label="Seu nome"
              data-testid="first-name-field"
              value={formik.values.first_name}
              onChange={formik.handleChange}
            />
            <Input
              id="last_name"
              label="Seu sobrenome"
              data-testid="last-name-field"
              value={formik.values.last_name}
              onChange={formik.handleChange}
            />
            <PasswordInput
              id="password"
              label="Senha"
              data-testid="password-field"
              placeholder="Digite sua senha"
              value={formik.values.password}
              onChange={formik.handleChange}
            />

            <Flex width="100%" pb="20px" pt="20px">
              <Checkbox
                id="accept_terms"
                isChecked={formik.values.accept_terms}
                onChange={handleTermsCheckboxChange}
                data-testid="terms-field"
              >
                Li e aceito os{' '}
                <Text as="span" color="brand.500" fontWeight="bold">
                  Termos de Uso
                </Text>
              </Checkbox>
            </Flex>

            <Flex width="100%" pb="20px">
              <Checkbox
                id="remember"
                data-testid="remember-field"
                isChecked={formik.values.remember}
                onChange={formik.handleChange}
              >
                Mantenha-me logado
              </Checkbox>
            </Flex>

            <Button
              width="100%"
              variant="primaryRounded"
              type="submit"
              data-testid="submit-button"
            >
              Criar Conta
            </Button>

            <Box width="100" textAlign="center" py="10px">
              <Link
                as={RouterLink}
                to="/auth"
                color="brand.500"
                fontWeight="bold"
              >
                Já tenho uma conta
              </Link>
            </Box>
          </VStack>
        </form>
      </Box>
      <TermsOfUseModal
        isOpen={modal.isOpen}
        onCancel={handleCancelTerms}
        onConfirm={handleConfirmTerms}
      />
    </>
  );
};

export default SignupBox;
