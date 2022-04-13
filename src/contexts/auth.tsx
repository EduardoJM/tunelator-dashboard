import { FC, createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { getErrorMessages } from "../utils/errors";
import { loginSchema } from "../schemas/auth";
import { User } from "../entities/User";
import api from "../services/api";
import * as authServices from "../services/auth";

export interface AuthContextData {
  loggedIn: boolean;
  userData: User | null;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: FC = ({ children }) => {
  const toast = useToast();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    async function checkStoredCredentials() {
      let token: string | null = null;
      if (localStorage.getItem("@TUNELATOR_REFRESH")) {
        token = localStorage.getItem("@TUNELATOR_REFRESH");
      } else if (sessionStorage.getItem("@TUNELATOR_REFRESH")) {
        token = localStorage.getItem("@TUNELATOR_REFRESH");
      }
      if (!token) {
        return;
      }
      try {
        const response = await authServices.refresh(token);
        setUserData(response.user);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.access}`;
      } catch {
        localStorage.removeItem("@TUNELATOR_REFRESH");
        sessionStorage.removeItem("@TUNELATOR_REFRESH");
      }
    }

    checkStoredCredentials();
  }, []);

  async function login(email: string, password: string, remember: boolean) {
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

      setUserData(response.user);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.access}`;
      if (remember) {
        localStorage.setItem("@TUNELATOR_REFRESH", response.refresh);
      } else {
        sessionStorage.setItem("@TUNELATOR_REFRESH", response.refresh);
      }
      toast({
        title: "Sucesso",
        description: "Login efetuado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      getErrorMessages(err).forEach((error) => {
        toast({
          title: error.title,
          description: error.text,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        loggedIn: !!userData,
        userData,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
