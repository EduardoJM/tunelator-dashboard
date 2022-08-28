import { FC, Suspense } from 'react';
import { Box } from '@chakra-ui/react';
import { ProfileFormSkeleton } from '@/components/Skeletons';
import { ProfileBoundary } from '@/components/ErrorBoundaries';
import ProfileForm from './ProfileForm';
import PasswordForm from './PasswordForm';

const Profile: FC = () => {
  return (
    <>
      <Box mt="50px" mb="30px">
        <Suspense fallback={<ProfileFormSkeleton />}>
          <ProfileBoundary>
            <ProfileForm />
          </ProfileBoundary>
        </Suspense>
      </Box>
      <Box mb="50px">
        <PasswordForm />
      </Box>
    </>
  );
};

export default Profile;
