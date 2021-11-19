import { setDate } from "date-fns";
import React, { createContext, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface IUser {
  name: string;
  email: string;
  password: string;
  drive_license: string;
  avatar: string;
}

interface IStateAuth {
  token: string;
  user: IUser;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthProviderProps {
  children: ReactNode;
}

interface IAuthContext {
  user: IUser;
  signIn: (credentials: ISignInCredentials) => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [data, setData] = useState<IStateAuth>({} as IStateAuth);

  const signIn = async ({ email, password }: ISignInCredentials) => {
    const response = await api.post("/sessions", { email, password });

    const { token, user } = response.data;
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setData({ token, user });
  };

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
