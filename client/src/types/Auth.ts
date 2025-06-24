import type { ReactNode } from "react";

export interface User {
  email: string;
  firstName: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export interface Children {
  children: ReactNode;
}

export interface LoginResponse {
  email: string;
  firstName: string;
  token?: string;
  message?: string;
}
