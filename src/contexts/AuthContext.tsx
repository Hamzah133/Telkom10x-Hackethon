"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  signup: (user: Omit<User, 'id'>) => void;
  loginWithGoogle: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for a logged-in user in local storage
    const storedUser = localStorage.getItem('bantu-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    localStorage.setItem('bantu-user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('bantu-user');
    setUser(null);
  };
  
  const signup = (userData: Omit<User, 'id'>) => {
    const newUser = { ...userData, id: Date.now().toString() };
    // In a real app, you would check if the user exists
    localStorage.setItem('bantu-user', JSON.stringify(newUser));
    setUser(newUser);
  };
  
  const loginWithGoogle = () => {
    // This is a mock google login for demo purposes.
    const googleUser = {
      id: 'google-12345',
      email: 'user@google.com',
      name: 'Google User',
    };
    localStorage.setItem('bantu-user', JSON.stringify(googleUser));
    setUser(googleUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
