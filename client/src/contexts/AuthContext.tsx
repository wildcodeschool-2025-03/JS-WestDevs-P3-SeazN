import React, { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  email: string;
  firstName: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    // Optionnel : sauvegarder dans localStorage/sessionStorage pour persistance
  };

  const logout = () => {
    setUser(null);
    // Optionnel : nettoyer localStorage/sessionStorage
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
