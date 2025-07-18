import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType, Children, User } from "../types/Auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Children) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasToken = document.cookie.includes("token=");

    if (!hasToken) {
      setIsLoading(false);
      console.info("Pas de token détecté — aucun refresh effectué.");
      return;
    }

    fetch("http://localhost:3310/api/refresh", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to refresh token");
        }
        return res.json();
      })
      .then((data) => {
        if (data?.email && data.username) {
          setUser({
            email: data.email,
            username: data.username,
          });
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      })
      .catch(() => {
        setIsLogged(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsLogged(true);
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLogged, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
