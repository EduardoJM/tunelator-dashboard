import { FC } from 'react';
import { Box, VStack, Heading, Text, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuth } from '../../../contexts/auth';
import Input from '../../../components/Input';
import Button from '../../../components/Common/Button';
import Checkbox from '../../../components/Checkbox';

const SignupBox: FC = () => {
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      remember: true,
    },
    onSubmit: ({ email, first_name, last_name, password, remember }) => {
      auth.signup(email, first_name, last_name, password, remember);
    },
  });

  return (
    <Box width="100%" maxWidth="450px" color="foreground.muted">
      <form onSubmit={formik.handleSubmit}>
        <VStack>
          <Heading width="100%" color="foreground.default" as="h1" size="2xl">
            Criar Conta
          </Heading>

          <Box pb="20px">
            <Text>
              A um passo de não precisar mais se descadastrar inúmeras vezes da
              mesma lista de e-mail.
            </Text>
          </Box>

          <Input
            id="email"
            label="E-mail"
            placeholder="exemplo@exemplo.com.br"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <Input
            id="first_name"
            label="Seu nome"
            value={formik.values.first_name}
            onChange={formik.handleChange}
          />
          <Input
            id="last_name"
            label="Seu sobrenome"
            value={formik.values.last_name}
            onChange={formik.handleChange}
          />
          <Input
            id="password"
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          <Flex width="100%" pb="20px">
            <Checkbox
              id="remember"
              isChecked={formik.values.remember}
              onChange={formik.handleChange}
            >
              Mantenha-me logado
            </Checkbox>
          </Flex>

          <Button width="100%" variant="primaryRounded" type="submit">
            Criar Conta
          </Button>

          <Box width="100" textAlign="center" py="10px">
            <Link as={RouterLink} to="/" color="brand.500" fontWeight="bold">
              Já tenho uma conta
            </Link>
          </Box>
        </VStack>
      </form>
    </Box>
  );
};

export default SignupBox;
