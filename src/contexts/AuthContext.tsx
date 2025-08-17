"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  User as FirebaseUser, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword as firebaseUpdatePassword,
  updateProfile as firebaseUpdateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from '@/lib/firebase';

interface User {
  uid: string;
  email: string | null;
  name?: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  updateUserName: (name: string) => Promise<void>;
  updateUserPassword: (password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email, name: userDoc.data()?.name });
        } else {
           setUser({ uid: firebaseUser.uid, email: firebaseUser.email, name: firebaseUser.displayName });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };
  
  const signup = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    await firebaseUpdateProfile(firebaseUser, { displayName: name });
    await setDoc(doc(db, "users", firebaseUser.uid), {
        name: name,
        email: email,
    });
  };
  
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;
    
    const userDocRef = doc(db, "users", firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        await setDoc(userDocRef, {
            name: firebaseUser.displayName,
            email: firebaseUser.email,
        });
    }
  };
  
  const updateUserName = async (name: string) => {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) throw new Error("User not found");

    await updateDoc(doc(db, "users", firebaseUser.uid), { name });
    
    setUser((prevUser) => {
        if (!prevUser) return null;
        return { ...prevUser, name: name };
    });
  }

  const updateUserPassword = async (password: string) => {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) throw new Error("User not found");

    await firebaseUpdatePassword(firebaseUser, password);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup, loginWithGoogle, updateUserName, updateUserPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
