import type { LoginResponse, SignUpResponse } from "./types";

export const loginApi = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await fetch("http://localhost:3310/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la connexion");
  }

  return response.json();
};

export const signUpApi = async (
  email: string,
  password: string,
): Promise<SignUpResponse> => {
  const response = await fetch("http://localhost:3310/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de l'inscription");
  }

  return response.json();
};
