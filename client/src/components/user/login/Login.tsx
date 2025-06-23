import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router";

interface LoginResponse {
  email: string;
  firstName: string;
  token?: string;
  message?: string;
}

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3310/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Erreur de connexion.");
        setLoading(false);
        return;
      }

      login({
        email: data.email,
        firstName: data.firstName,
      });

      navigate("/dashboard");
    } catch (error: unknown) {
      console.error("Erreur serveur :", error);
      setErrorMessage("Erreur lors de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Se connecter</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
        <button type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Connexion"}
        </button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </>
  );
};

export default Login;
