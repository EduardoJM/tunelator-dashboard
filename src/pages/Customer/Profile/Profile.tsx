import { FC, Suspense } from 'react';
import { Box } from '@chakra-ui/react';
import { ProfileFormSkeleton } from '@/components/Skeletons';
import { ProfileBoundary } from '@/components/ErrorBoundaries';
import ProfileForm from './ProfileForm';

const Profile: FC = () => {
  return (
    <>
      <Box py="50px">
        <Suspense fallback={<ProfileFormSkeleton />}>
          <ProfileBoundary>
            <ProfileForm />
          </ProfileBoundary>
        </Suspense>
      </Box>
    </>
  );
};

export default Profile;
