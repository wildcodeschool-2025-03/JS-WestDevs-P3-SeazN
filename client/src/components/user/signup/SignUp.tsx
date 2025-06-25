import { useTransition } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";
import type { LoginResponse } from "../../../types/Auth";
import "../login/Login.css";

export default function SignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    const data = Object.fromEntries(formData);

    if (data.password !== data.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    startTransition(async () => {
      try {
        const response = await fetch("http://localhost:3310/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result: LoginResponse = await response.json();

        if (!response.ok) {
          toast.error(
            result.message || "Erreur lors de la création du compte.",
          );
          return;
        }

        login({
          email: result.email,
          firstName: result.username,
        });

        toast.success("Compte créé avec succès !");
        navigate("/dashboard");
      } catch (err) {
        console.error(err);
        toast.error("Erreur serveur, réessayez plus tard.");
      }
    });
  }

  return (
    <div className="login_container">
      <h2>Créer un compte</h2>
      <form action={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          required
          disabled={isPending}
        />
        <input
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          required
          disabled={isPending}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
          disabled={isPending}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          required
          disabled={isPending}
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "Création du compte..." : "S'inscrire"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
