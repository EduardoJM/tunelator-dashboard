import { useQuery } from 'react-query';
import { getUserData } from '../api/auth';

const useAuthenticatedUser = () =>
  useQuery('auth-user', getUserData, {
    cacheTime: 0,
  });

export default useAuthenticatedUser;
