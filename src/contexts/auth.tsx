import { FC, createContext, useState, useContext, useEffect } from 'react';
import { User } from '../entities/User';
import {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useCheckLogin,
} from '../services/mutations';

export interface LoginData {
  email: string;
  password: string;
  remember: boolean;
  from: string;
}

export interface SignupData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  remember: boolean;
  accept_terms: boolean;
}

export interface AuthContextData {
  loggedIn: boolean;
  userData: User | null;
  login: (data: LoginData) => void;
  signup: (data: SignupData) => void;
  logout: () => void;
  setUserData: (user: User) => void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: FC = ({ children }) => {
  const [userData, setUserData] = useState<User | null>(null);

  const loginMutation = useLoginMutation(user => setUserData(user));
  const signupMutation = useSignupMutation(user => setUserData(user));
  const logoutMutation = useLogoutMutation(user => setUserData(user));
  useCheckLogin(user => setUserData(user));

  const logout = () => logoutMutation.mutate();

  const signup = ({
    email,
    first_name,
    last_name,
    password,
    remember,
    accept_terms,
  }: SignupData) => {
    signupMutation.mutate({
      email,
      first_name,
      last_name,
      password,
      remember,
      accept_terms,
    });
  };

  const login = ({ email, password, remember, from }: LoginData) => {
    loginMutation.mutate({ email, password, remember, from });
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn: !!userData,
        userData,
        setUserData,
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
