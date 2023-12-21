/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config.tsx";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
interface AuthInfo {
  createUser: (email: string, password: string) => Promise<UserCredential>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  googleSignIn: () => Promise<UserCredential>;
  user: object | null;
}

export const AuthContext = createContext<AuthInfo | null>(null);

// google provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({} || null);

  // create new user
  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user
  const loginUser = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // login with google
  const googleSignIn = ()=>{
    return signInWithPopup(auth, googleProvider)
  } 

  // setup an observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("observer", currentUser);

      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo: AuthInfo = {
    user,
    createUser,
    loginUser,
    googleSignIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
