import { loginApi, LoginResponse } from "./authRepository";

export const login = async (email: string, password: string, onSuccess: (data: LoginResponse) => void, onError: (message: string) => void) => {
  try {
    const data = await loginApi(email, password);
    onSuccess(data);
  } catch (error: any) {
    onError(error.message);
  }
};
