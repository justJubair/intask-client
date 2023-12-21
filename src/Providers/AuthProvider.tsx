/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config.tsx";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential,
} from "firebase/auth";
interface AuthInfo {
  createUser: (email: string, password: string) => Promise<UserCredential>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  googleSignIn: () => Promise<UserCredential>;
  githubSignIn: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
  loading: boolean;
  user: object | null;
}

export const AuthContext = createContext<AuthInfo | null>(null);

// google provider
const googleProvider = new GoogleAuthProvider();

// github provider
const githubProvider = new GithubAuthProvider()

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({} || null);
  const [loading, setLoading] = useState(true)

  // create new user
  const createUser = (email: string, password: string) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user
  const loginUser = (email: string, password: string) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google login
  const googleSignIn = ()=>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  } 

  // github login
  const githubSignIn = ()=>{
    setLoading(true)
    return signInWithPopup(auth, githubProvider)
  }

  // logout a user
  const logOut = ()=>{
    setLoading(true)
    return signOut(auth)
  }

  // setup an observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
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
    githubSignIn,
    logOut,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
