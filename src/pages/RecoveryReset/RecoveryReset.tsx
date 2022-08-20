import { FC, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router';
import { GiBackwardTime } from 'react-icons/gi';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useLoading } from '../../contexts/loading';
import { isSessionValid } from '../../services/api/recovery';
import { Button } from '@/components/Common';
import { PasswordInput } from '@/components/Forms';
import { useResetPasswordMutation } from '../../services/mutations';

const RecoveryReset: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pushLoading, popLoading } = useLoading();
  const [valid, setValid] = useState(true);
  const boxWidth = useBreakpointValue({ base: '100%', md: '50%' });
  const { t } = useTranslation();

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
      <Flex flexDirection="column" width="100%" minHeight="100vh">
        <Flex width="100%" flex="1" alignItems="stretch">
          <Container maxW="120ch">
            <Flex h="100%" flexDir="column" alignItems="stretch">
              <Flex flex="1" alignItems="stretch" flexWrap="wrap-reverse">
                <Flex
                  w={boxWidth}
                  alignItems="stretch"
                  justifyContent="center"
                  flexDir="column"
                >
                  <Heading as="h1" size="xl" color="brand.500">
                    {t('recoveryReset.expired.title')}
                  </Heading>
                  <Heading
                    as="h2"
                    size="md"
                    mt="50px"
                    color="brand.500"
                    fontWeight="normal"
                  >
                    {t('recoveryReset.expired.subtitle')}
                  </Heading>

                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    pt="20px"
                    pb="60px"
                  >
                    <Button
                      onClick={handleGoToPasswordRecovery}
                      variant="primaryRounded"
                      data-testid="recovery-button"
                    >
                      {t('recoveryReset.expired.recovery')}
                    </Button>
                  </Flex>
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
            </Flex>
          </Container>
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
                  {t('recoveryReset.valid.title')}
                </Heading>

                <Box pb="20px">
                  <Text>{t('recoveryReset.valid.subtitle')}</Text>
                </Box>

                <PasswordInput
                  id="password1"
                  label={t('recoveryReset.valid.password')}
                  data-testid="password1-field"
                  placeholder={t('recoveryReset.valid.passwordPlaceholder')}
                  value={formik.values.password1}
                  onChange={formik.handleChange}
                />

                <PasswordInput
                  id="password2"
                  label={t('recoveryReset.valid.confirmation')}
                  data-testid="password2-field"
                  placeholder={t('recoveryReset.valid.confirmationPlaceholder')}
                  value={formik.values.password2}
                  onChange={formik.handleChange}
                />

                <Button
                  width="100%"
                  variant="primaryRounded"
                  type="submit"
                  data-testid="submit-button"
                >
                  {t('recoveryReset.valid.submit')}
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
