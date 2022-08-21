import { FC, Suspense } from 'react';
import { Box } from '@chakra-ui/react';
import { ProfileFormSkeleton } from '@/components/Skeletons';
import ProfileForm from './ProfileForm';

const Profile: FC = () => {
  return (
    <>
      <Box py="50px">
        <Suspense fallback={<ProfileFormSkeleton />}>
          <ProfileForm />
        </Suspense>
      </Box>
    </>
  );
};

export default Profile;
