/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import auth from "../firebase/firebase.config.tsx";
import {
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
interface AuthInfo {
  createUser: (email: string, password: string) => Promise<UserCredential>;
}

export const AuthContext = createContext<AuthInfo | null>(null);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // create new user
  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

 

  const authInfo: AuthInfo = {
    createUser,
    
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
