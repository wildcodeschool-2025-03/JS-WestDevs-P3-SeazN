import { loginApi, signUpApi } from "./authRepository";
import type { LoginResponse, SignUpResponse } from "./types";

export const login = async (
  email: string,
  password: string,
  onSuccess: (data: LoginResponse) => void,
  onError: (message: string) => void,
) => {
  try {
    const data = await loginApi(email, password);
    onSuccess(data);
  } catch (error) {
    if (error instanceof Error) {
      onError(error.message);
    } else {
      onError("Une erreur inconnue est survenue");
    }
  }
};

export const signup = async (
  email: string,
  password: string,
  onSuccess: (data: SignUpResponse) => void,
  onError: (message: string) => void,
) => {
  try {
    const data = await signUpApi(email, password);
    onSuccess(data);
  } catch (error) {
    if (error instanceof Error) {
      onError(error.message);
    } else {
      onError("Une erreur inconnue est survenue");
    }
  }
};
