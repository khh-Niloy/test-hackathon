import React, { useEffect } from "react";
import { createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function createUser(email, password) {
    setLoading(true);
    return await createUserWithEmailAndPassword(auth, email, password).finally(
      () => setLoading(false)
    );
  }

  async function signInUser(email, password) {
    setLoading(true);
    return await signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  }

  async function signOutUser() {
    setLoading(true);
    return await signOut(auth).finally(() => setLoading(false));
  }

  async function updateUser(user) {
    return await updateProfile(auth.currentUser, user);
  }

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribed();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, createUser, signInUser, signOutUser, loading, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
