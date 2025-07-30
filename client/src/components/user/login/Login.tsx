import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";
import type { LoginResponse } from "../../../types/Auth";
import "../login/Login.css";

interface LoginProps {
  setIsPending: (bool: boolean) => void;
  isPending: boolean;
}

export default function Login({ setIsPending, isPending }: LoginProps) {
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(formData: FormData) {
    const data = Object.fromEntries(formData);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setIsPending(false);

      const result: LoginResponse = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Erreur de connexion.");
        return;
      }

      login({
        id: result.id,
        email: result.email,
        username: result.username,
      });

      toast.success("Connexion réussie !");
      toast.success("Vous allez être redirigé.e vers la page recettes.", {
        autoClose: 2000,
        onClose: () => {
          navigate("/recipes");
        },
      });
    } catch (error) {
      console.error("Erreur serveur :", error);
      toast.error("Erreur lors de la connexion.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="login_container">
      <h2>Se connecter</h2>
      <form
        action={(formData) => {
          setIsPending(true);
          handleSubmit(formData);
        }}
        id="login-form"
        className="login-form"
      >
        <input
          type="email"
          name="email"
          placeholder="Entrez votre e-mail"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Entrez votre mot de passe"
          required
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
