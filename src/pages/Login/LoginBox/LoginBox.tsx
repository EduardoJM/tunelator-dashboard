import { FC } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Flex,
  Spacer,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuth } from '../../../contexts/auth';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';

const LoginBox: FC = () => {
  const auth = useAuth();
  const location = useLocation();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    onSubmit: ({ email, password, remember }) => {
      const from = String((location.state as any)?.from?.pathname || '/');
      auth.login(email, password, remember, from);
    },
  });

  return (
    <Box width="100%" maxWidth="450px" color="foreground.muted">
      <form onSubmit={formik.handleSubmit}>
        <VStack>
          <Heading width="100%" color="foreground.default" as="h1" size="2xl">
            Entrar
          </Heading>

          <Box pb="20px">
            <Text>
              Gerenciar seus e-mails de redirecionamentos e acesso simplificado
              para e-mails.
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
            id="password"
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          <Flex
            flexDirection={{
              base: 'column',
              md: 'row',
            }}
            width="100%"
            pb="20px"
          >
            <Checkbox
              id="remember"
              isChecked={formik.values.remember}
              onChange={formik.handleChange}
            >
              Mantenha-me logado
            </Checkbox>
            <Spacer />
            <Text textAlign="right">Esqueceu sua senha?</Text>
          </Flex>

          <Button width="100%" variant="primary-rounded" type="submit">
            Entrar
          </Button>

          <Box width="100" textAlign="center" py="10px">
            <Link
              as={RouterLink}
              to="/signup"
              color="brand.500"
              fontWeight="bold"
            >
              Criar minha conta
            </Link>
          </Box>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginBox;
