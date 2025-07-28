import type { ReactNode } from "react";

export type User = {
  id: number;
  email: string;
  username: string;
};

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
  isLogged: boolean;
}

export interface Children {
  children: ReactNode;
}

export interface LoginResponse {
  username: string;
  email: string;
  firstName: string;
  token?: string;
  message?: string;
}

export interface signUpResponse {
  username: string;
  email: string;
  firstName: string;
  isMajor: boolean;
  lastActive: string;
  country: string;
  token?: string;
  message?: string;
}
