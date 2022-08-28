import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Heading, Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import * as CSS from 'csstype';
import { PasswordInput } from '@/components/Forms';
import { Button } from '@/components/Common';
import { useUpdateUserPasswordMutation } from '@/services/mutations';

const PasswordForm = () => {
  const flexDirection = useBreakpointValue<CSS.Property.FlexDirection>({
    base: 'column',
    md: 'row',
  });
  const updateUserPasswordMutation = useUpdateUserPasswordMutation();
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmation: '',
    },
    onSubmit: data => updateUserPasswordMutation.mutate(data),
  });
  const { t } = useTranslation();

  return (
    <Box
      bgColor="#FEFEFE"
      _hover={{ bgColor: '#EFEFEF' }}
      shadow="md"
      p="10px"
      borderRadius="5px"
    >
      <Heading as="h2" size="md" mb="15px">
        {t('customer.password.title')}
      </Heading>

      <form name="password-data" onSubmit={formik.handleSubmit}>
        <Flex gap="10px" mb="20px" flexDir={flexDirection}>
          <PasswordInput
            label={t('customer.password.password')}
            id="password"
            data-testid="password-field"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <PasswordInput
            label={t('customer.password.confirmation')}
            id="confirmation"
            data-testid="confirmation-field"
            value={formik.values.confirmation}
            onChange={formik.handleChange}
          />
        </Flex>

        <Flex justifyContent="flex-end" flexDir={flexDirection}>
          <Button
            variant="primaryRounded"
            type="submit"
            data-testid="change-password-button"
          >
            {t('customer.password.change')}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default PasswordForm;
