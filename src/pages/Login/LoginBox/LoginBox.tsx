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
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/Common';
import { Input, PasswordInput, Checkbox } from '@/components/Forms';

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
      auth.login({ email, password, remember, from });
    },
  });
  const { t } = useTranslation();

  return (
    <Box
      data-testid="login-box"
      width="100%"
      maxWidth="450px"
      color="foreground.muted"
    >
      <form name="login-form" onSubmit={formik.handleSubmit}>
        <VStack>
          <Heading width="100%" color="foreground.default" as="h1" size="2xl">
            {t('login.title')}
          </Heading>

          <Box pb="20px">
            <Text>{t('login.subtitle')}</Text>
          </Box>

          <Input
            id="email"
            label={t('login.email')}
            placeholder="exemplo@exemplo.com.br"
            data-testid="email-field"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <PasswordInput
            id="password"
            label={t('login.password')}
            data-testid="password-field"
            placeholder="Digite sua senha"
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
              data-testid="remember-field"
              isChecked={formik.values.remember}
              onChange={formik.handleChange}
            >
              {t('login.remember')}
            </Checkbox>
            <Spacer />
            <Link
              as={RouterLink}
              to="/recovery"
              color="brand.500"
              fontWeight="bold"
              textAlign="right"
              data-testid="recovery-link"
            >
              {t('login.recovery')}
            </Link>
          </Flex>

          <Button
            width="100%"
            variant="primaryRounded"
            type="submit"
            data-testid="submit-button"
          >
            {t('login.login')}
          </Button>

          <Box width="100" textAlign="center" py="10px">
            <Link
              as={RouterLink}
              to="/signup"
              color="brand.500"
              fontWeight="bold"
              data-testid="signup-link"
            >
              {t('login.signup')}
            </Link>
          </Box>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginBox;
