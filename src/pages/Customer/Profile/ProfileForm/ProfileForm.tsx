import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Heading, Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import * as CSS from 'csstype';
import { Input } from '@/components/Forms';
import { Button } from '@/components/Common';
import { useAuth } from '@/contexts/auth';
import { useUpdateUserDataMutation } from '@/services/mutations';
import { useAuthenticatedUser } from '@/services/queries';

const ProfileForm = () => {
  const { setUserData } = useAuth();
  const updateUserData = useUpdateUserDataMutation(setUserData);
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
    },
    onSubmit: data => updateUserData.mutate(data),
  });
  const { data } = useAuthenticatedUser();
  const displayHeading = useMemo(() => {
    if (!data?.first_name) {
      return data?.email;
    }
    if (!data.last_name) {
      return data.first_name;
    }
    return `${data.first_name} ${data.last_name}`;
  }, [data]);
  const { t } = useTranslation();

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
          {t('customer.profile.title')}
        </Heading>

        <form name="profile-data" onSubmit={formik.handleSubmit}>
          <Flex gap="10px" mb="20px" flexDir={flexDirection}>
            <Input
              type="text"
              label={t('customer.profile.firstname')}
              id="first_name"
              data-testid="first-name-field"
              value={formik.values.first_name}
              onChange={formik.handleChange}
            />
            <Input
              type="text"
              label={t('customer.profile.lastname')}
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
              {t('customer.profile.save')}
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default ProfileForm;
