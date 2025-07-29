import { Autocomplete } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import type { signUpResponse } from "../../../types/Auth";
import "../login/Login.css";
import type { CountryType } from "../signup/data/countries";
import countries from "../signup/data/countries";

interface SignUpProps {
  setIsPending: (bool: boolean) => void;
  isPending: boolean;
}

export default function SignUp({ setIsPending, isPending }: SignUpProps) {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleChange = (
    _event: React.SyntheticEvent,
    value: CountryType | null,
  ) => {
    setSelectedCountry(value?.label || "");
  };

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    const data = Object.fromEntries(formData);
    const payload = JSON.parse(JSON.stringify(data));

    for (const [key] of Object.entries(payload)) {
      if (key === "is_major") {
        payload[key] = true;
      }
    }

    if (selectedCountry) {
      payload.country = selectedCountry;
    }

    if (payload.password !== payload.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      setIsPending(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setIsPending(false);
      const result: signUpResponse = await response.json();

      if (!response.ok) {
        toast.error(
          result.message ||
            "Certains champs semblent incorrects, vérifiez votre saisie.",
        );
        setIsPending(false);
        return;
      }

      toast.success("Compte créé avec succès !");
      toast.success("Vous allez être redirigé.e vers la page recettes.", {
        autoClose: 2000,
        onClose: () => navigate("/recipes"),
      });
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur, réessayez plus tard.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="login_container">
      <h2>Créer un compte</h2>
      <form id="signup-form" className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
        />
        <small>
          Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1
          minuscule, 1 chiffre et 1 caractère spécial
        </small>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          required
        />
        <Autocomplete
          className="autocomplete"
          options={countries}
          onChange={handleChange}
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => {
            const { key, ...rest } = props;
            return (
              <Box
                key={key}
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...rest}
              >
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt={`${option.label} flag`}
                />
                {option.label}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Sélectionner votre pays" />
          )}
        />
        <div className="checkbox-group">
          <input type="checkbox" name="is_major" />
          <label htmlFor="isMajor">Je suis majeur</label>
        </div>
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            const form = document.getElementById(
              "signup-form",
            ) as HTMLFormElement;
            const formData = new FormData(form);
            handleSubmit(formData);
          }}
        >
          {isPending ? "Création du compte..." : "S'inscrire"}
        </button>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
