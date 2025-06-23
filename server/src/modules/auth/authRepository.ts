export interface LoginResponse {
  token: string;
  email: string;
  firstName: string;
}

export const loginApi = async (email: string, password: string): Promise<LoginResponse> => {
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
