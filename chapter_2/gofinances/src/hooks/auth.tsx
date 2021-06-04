import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  userStoragedLoading: boolean;
}
export const AuthContext = createContext({} as AuthContextData);


function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<User>({} as User);
  const [userStoragedLoading, setUserStoragedLoading] = useState(true);

  const userStorageKey = '@gofinances:user'

  async function signInWithGoogle(){
    try {
      const result = await Google.logInAsync({
        iosClientId: '235988806079-0ov229fca4830pe6i9l3v4lhkcf0u9ug.apps.googleusercontent.com',
        androidClientId: '235988806079-0hb7hg907g86krg2tkoajse05rfqdlla.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      if(result.type === 'success'){
        const userLogged = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!
        }
        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }

    } catch(error) {
      throw new Error(error)
    }
  }

  async function signInWithApple(){
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });

      const name = credential.fullName!.givenName!;
      const photo = `https://ui-avatars.com/api/?name=${name}&length=1`
      const userLogged = {
        id: String(credential.user),
        email: credential.email!,
        name,
        photo,
      };

      setUser(userLogged);
      await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))


    } catch (error) {
      throw new Error(error)
    }
  }

  async function signOut(){
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStoragedData(){
      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if(userStoraged){
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }
      setUserStoragedLoading(false);
    }

    loadUserStoragedData();

  }, [])


  return(
    <AuthContext.Provider value={{user, signInWithGoogle, signInWithApple, signOut, userStoragedLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContext)

  return context;
}

export { AuthProvider, useAuth }

