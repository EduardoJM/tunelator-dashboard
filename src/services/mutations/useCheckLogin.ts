import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoading } from '../../contexts/loading';
import api from '../api/axios';
import { refresh } from '../api/auth';
import { User } from '../../entities/User';

const useCheckLogin = (setUserData: (user: User) => void) => {
  const { pushLoading, popLoading } = useLoading();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const checkLoginMutation = useMutation(async () => {
    let token: string | null = null;
    if (localStorage.getItem('@TUNELATOR_REFRESH')) {
      token = localStorage.getItem('@TUNELATOR_REFRESH');
    } else if (sessionStorage.getItem('@TUNELATOR_REFRESH')) {
      token = sessionStorage.getItem('@TUNELATOR_REFRESH');
    }
    if (!token) {
      return;
    }

    pushLoading();

    try {
      const response = await refresh(token);

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.access}`;

      setUserData(response.user);

      navigate(pathname, { replace: true });
    } catch {}

    popLoading();
  });

  useEffect(() => {
    checkLoginMutation.mutate();
  }, []);
};

export default useCheckLogin;
