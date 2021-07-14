import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from 'react';

import api from '../services/api';
import {database} from '../databases';
import { User as ModelUser } from '../databases/models/User';

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children } : AuthProviderProps){
  const [data, setData] = useState<User>({} as User);

  async function signIn({ email, password }: SignInCredentials){
    try{
      const response = await api.post('/sessions', {
        email,
        password
      });
  
      const {token, user} = response.data;
      
      api.defaults.headers.authorization = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>('users');

      await database.action(async () => {
        await userCollection.create(( newUser ) => {
          newUser.user_id = user.id,
          newUser.name = user.name,
          newUser.email = user.email,
          newUser.avatar = user.avatar,
          newUser.driver_license = user.driver_license
          newUser.token = token
        });
      });
      console.log(...user);
      setData({token, ...user});
    } catch(error) {
      throw new Error(error);
    }
  }

  async function signOut(){
    try {
      console.log(data.id);
      const userCollection = database.get<ModelUser>('users');
      await database.action(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });

      setData({} as User)
    } catch (error) {
      throw new Error(error);
    }
  }

  async function updateUser(user: User){
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.action(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.update((userData) => {
          userData.name = user.name,
          userData.avatar = user.avatar,
          userData.driver_license = user.driver_license
        });
      });

      setData(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>('users');
      const response = await userCollection.query().fetch();
      if(response.length > 0){
        const userData = response[0]._raw as unknown as User;
        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData(userData);
      }
    }

    loadUserData();
  }, [])

  return (
    <AuthContext.Provider 
      value={{
        user: data,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData{
  const context = useContext(AuthContext);

  return context;
}

export {useAuth, AuthProvider}