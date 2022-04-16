import { FC, createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { getErrorMessages } from '../utils/errors';
import { loginSchema, signupSchema } from '../schemas/auth';
import { User } from '../entities/User';
import { useLoading } from '../contexts/loading';
import api from '../services/api';
import * as authServices from '../services/auth';

export interface AuthContextData {
  loggedIn: boolean;
  userData: User | null;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  signup: (
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    remember: boolean
  ) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: FC = ({ children }) => {
  const toast = useToast();
  const { pushLoading, popLoading } = useLoading();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkStoredCredentials() {
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
        const response = await authServices.refresh(token);

        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.access}`;

        setUserData(response.user);
      } catch {
        localStorage.removeItem('@TUNELATOR_REFRESH');
        sessionStorage.removeItem('@TUNELATOR_REFRESH');
      }
      popLoading();
    }

    checkStoredCredentials();
  }, []);

  async function logout() {
    pushLoading();

    localStorage.removeItem('@TUNELATOR_REFRESH');
    sessionStorage.removeItem('@TUNELATOR_REFRESH');
    api.defaults.headers.common['Authorization'] = '';
    setUserData(null);

    popLoading();
  }

  async function signup(
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    remember: boolean
  ) {
    pushLoading();
    try {
      const validatedData = signupSchema.validateSync({
        email,
        first_name,
        last_name,
        password,
      });
      const response = await authServices.signup(
        validatedData.email,
        validatedData.first_name,
        validatedData.last_name,
        validatedData.password
      );

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.access}`;

      setUserData(response.user);
      if (remember) {
        localStorage.setItem('@TUNELATOR_REFRESH', response.refresh);
      } else {
        sessionStorage.setItem('@TUNELATOR_REFRESH', response.refresh);
      }
      toast({
        title: 'Sucesso',
        description: 'Login efetuado com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      getErrorMessages(err).forEach(error => {
        toast({
          title: error.title,
          description: error.text,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
    }
    popLoading();
  }

  async function login(email: string, password: string, remember: boolean) {
    pushLoading();
    try {
      const validatedData = loginSchema.validateSync({
        email,
        password,
        remember,
      });
      const response = await authServices.login(
        validatedData.email,
        validatedData.password
      );

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.access}`;

      setUserData(response.user);
      if (remember) {
        localStorage.setItem('@TUNELATOR_REFRESH', response.refresh);
      } else {
        sessionStorage.setItem('@TUNELATOR_REFRESH', response.refresh);
      }
      toast({
        title: 'Sucesso',
        description: 'Login efetuado com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      getErrorMessages(err).forEach(error => {
        toast({
          title: error.title,
          description: error.text,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
    }
    popLoading();
  }

  return (
    <AuthContext.Provider
      value={{
        loggedIn: !!userData,
        userData,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
