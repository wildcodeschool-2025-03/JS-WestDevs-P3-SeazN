import { useTransition } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import type { LoginResponse } from "../../../types/Auth";
import "../login/Login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    const data = Object.fromEntries(formData);
    const email = data.email as string;
    const password = data.password as string;

    startTransition(async () => {
      try {
        const response = await fetch("http://localhost:3310/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const result: LoginResponse = await response.json();

        if (!response.ok) {
          alert(result.message || "Erreur de connexion.");
          return;
        }

        login({
          email: result.email,
          firstName: result.firstName,
        });

        navigate("/dashboard");
      } catch (error) {
        console.error("Erreur serveur :", error);
        alert("Erreur lors de la connexion.");
      }
    });
  }

  return (
    <div className="login_container">
      <h2>Se connecter</h2>
      <form action={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Entrez votre e-mail"
          required
          disabled={isPending}
        />
        <input
          type="password"
          name="password"
          placeholder="Entrez votre mot de passe"
          required
          disabled={isPending}
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "Connexion..." : "Connexion"}
        </button>
      </form>
    </div>
  );
}
