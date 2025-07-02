import { useState, useTransition } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import type { signUpResponse } from "../../../types/Auth";
import "../login/Login.css";
import { Autocomplete } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import countries from "./countries";
import type { CountryType } from "./countries";

export default function SignUp() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleChange = (
    _event: React.SyntheticEvent,
    value: CountryType | null,
  ) => {
    setSelectedCountry(value?.label || "");
  };

  async function handleSubmit(formData: FormData) {
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
      return;
    }

    console.log("contenu ?", payload);
    startTransition(async () => {
      try {
        const response = await fetch("http://localhost:3310/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result: signUpResponse = await response.json();

        if (!response.ok) {
          toast.error(
            result.message || "Erreur lors de la création du compte.",
          );
          return;
        }

        toast.success("Compte créé avec succès !");
        toast.success("Vous allez être redirigé vers votre tableau de bord. ");
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
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

        <Autocomplete
          className="autocomplete"
          options={countries}
          onChange={handleChange}
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
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
          )}
          renderInput={(params) => (
            <TextField {...params} label="Sélectionner votre pays" />
          )}
        />

        <div className="checkbox-group">
          <input type="checkbox" name="is_major" disabled={isPending} />
          <label htmlFor="isMajor">Je suis majeur</label>
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? "Création du compte..." : "S'inscrire"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
// Passw0rd!
