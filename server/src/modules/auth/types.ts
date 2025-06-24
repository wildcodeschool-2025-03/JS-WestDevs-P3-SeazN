export interface User {
  email: string;
  firstName: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  firstName: string;
}
