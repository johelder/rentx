import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { api } from "../services/api";
import { database } from "../database";
import { User } from "../database/model/User";

interface IUser {
  id: string;
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
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
  signOut: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [data, setData] = useState<IUser>({} as IUser);

  const signIn = async ({ email, password }: ISignInCredentials) => {
    try {
      const response = await api.post("/sessions", { email, password });

      const { token, user } = response.data;
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const userCollection = await database.get<User>("users");

      await database.write(async () => {
        await userCollection.create((newUser) => {
          (newUser.user_id = user.id),
            (newUser.name = user.name),
            (newUser.email = user.email),
            (newUser.driver_license = user.driver_license),
            (newUser.avatar = user.avatar),
            (newUser.token = token);
        });
      });

      setData({ ...user, token });
    } catch (error) {
      throw new Error(error);
    }
  };

  console.log(data);

  const signOut = async () => {
    try {
      const userCollection = database.get<User>("users");
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });

      setData({} as IUser);
    } catch (error) {
      throw new Error(error);
    }
  };

  const loadUserData = async () => {
    const userCollection = database.get<User>("users");
    const response = await userCollection.query().fetch();

    if (response.length > 0) {
      const userData = response[0] as unknown as User;
      api.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;

      setData(userData);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
