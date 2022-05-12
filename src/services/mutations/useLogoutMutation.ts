import { useMutation } from 'react-query';
import { useLoading } from '../../contexts/loading';
import api from '../api/axios';

const useLogoutMutation = (setUserData: (user: null) => void) => {
  const { pushLoading, popLoading } = useLoading();

  return useMutation(async () => {
    pushLoading();

    localStorage.removeItem('@TUNELATOR_REFRESH');
    sessionStorage.removeItem('@TUNELATOR_REFRESH');
    api.defaults.headers.common['Authorization'] = '';
    setUserData(null);

    popLoading();
  });
};

export default useLogoutMutation;
