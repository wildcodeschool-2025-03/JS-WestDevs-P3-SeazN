import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { type FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import "./NewRecipes.css";

const NewRecipes = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [availableIngredients, setAvailableIngredients] = useState<
    Ingredient[]
  >([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [currentQuantity, setCurrentQuantity] = useState("");
  const [currentUnit, setCurrentUnit] = useState("");
  const [availableUnit, setAvailableUnit] = useState<
    { name: string; id: number }[]
  >([]);
  const [steps, setSteps] = useState([{ id: 1, content: "" }]);

  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useAuth();
  const guestOptions = [2, 4, 6, 8, 10, 12];

  useEffect(() => {
    fetch(`${apiUrl}/api/ingredients`)
      .then((res) => res.json())
      .then((data) => setAvailableIngredients(data));

    fetch(`${apiUrl}/api/unit`)
      .then((res) => res.json())
      .then((data) => setAvailableUnit(data));
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.files &&
      setImageSrc(URL.createObjectURL(event.target.files[0]));
    event.target.files;
  };

  const handleIngredientChange = (
    _event: React.SyntheticEvent,
    value:
      | string
      | { id: number; name: string; quantity: string; unit: string }
      | null,
  ) => {
    if (typeof value === "string") {
      setSelectedIngredient(value);
    } else if (value && typeof value === "object") {
      setSelectedIngredient(value.name);
    } else {
      setSelectedIngredient("");
    }
  };

  const addIngredient = () => {
    try {
      if (!selectedIngredient || !currentQuantity || !currentUnit) {
        toast.error("Tous les champs de l'ingrédient sont obligatoires");
        return;
      }

      const quantity = Number(currentQuantity);
      if (Number.isNaN(quantity)) {
        toast.error("La quantité doit être un nombre valide");
        return;
      }

      if (quantity < 0) {
        toast.error("La quantité ne peut pas être négative");
        return;
      }

      if (quantity > 5000) {
        toast.error("La quantité ne peut pas dépasser 5000");
        return;
      }
      const ingredientId = availableIngredients.find(
        (ing) => ing.name === selectedIngredient,
      );

      if (!ingredientId) {
        toast.error("L'ingrédient sélectionné n'existe pas");
        return;
      }

      const newIngredient = {
        id: ingredientId.id,
        name: selectedIngredient,
        quantity: currentQuantity,
        unit: currentUnit,
      };

      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);

      setSelectedIngredient("");
      setCurrentQuantity("");
      setCurrentUnit("");

      toast.success("Ingrédient ajouté avec succès");
    } catch (err) {
      toast.error("Erreur lors de l'ajout de l'ingrédient");
    }
  };
  const removeIngredient = (ingredientId: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== ingredientId),
    );
  };

  const addStep = () => {
    setSteps((prevSteps) => {
      const newId = Math.max(...prevSteps.map((step) => step.id)) + 1;
      return [...prevSteps, { id: newId, content: "" }];
    });
  };

  const removeStep = (stepId: number) => {
    if (steps.length > 1) {
      setSteps((prevSteps) => prevSteps.filter((step) => step.id !== stepId));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const formData = new FormData(e.currentTarget);
    const formObj = Object.fromEntries(formData);
    const formElement = e.currentTarget;

    const instructions = [];
    let stepOrder = 1;
    for (const key of Object.keys(formObj)) {
      if (key.startsWith("instruction")) {
        const content = formObj[key];
        if (typeof content === "string" && content.trim() !== "") {
          formData.delete(`instruction ${stepOrder}`);
          instructions.push({
            step_order: stepOrder,
            content: content.trim(),
          });
          stepOrder++;
        }
      }
    }

    formData.append("instructions", JSON.stringify(instructions));
    formData.append("ingredients", JSON.stringify(ingredients));

    fetch(`${apiUrl}/api/user/${user.id}/newRecipes`, {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.ok) {
          setImageSrc("");
          setIngredients([]);
          setSteps([{ id: 1, content: "" }]);
          formElement.reset();
          toast.success(
            "Bravo, vous avez réussi à créer une nouvelle recette 🎉",
          );
          if (!instructions.length) {
            toast.error("Au moins une instruction est requise");
            return;
          }
        } else if (res.status === 400 && data.errors) {
          for (const error of data.errors as {
            field: string;
            message: string;
          }[]) {
            toast.error(error.message);
          }
        } else {
          toast.error("La création de la recette a échoué 😩");
        }
      })
      .catch((err) => {
        console.error("Erreur réseau:", err);
        toast.error("La création de la recette a échoué 😩");
      });
  };

  return (
    <article className="new-recipes">
      {user ? (
        <form onSubmit={handleSubmit}>
          <h2>Poster une recette</h2>

          <label htmlFor="recipeName">
            <h3>La recette</h3>
            <input
              type="text"
              id="recipeName"
              name="name"
              placeholder="Nom de la recette"
              min={5}
              max={200}
              required
            />
          </label>

          <label htmlFor="image">
            <h3>La photo</h3>
            <legend> Photo de la recette</legend>
            <input
              type="file"
              name="image"
              id="image"
              accept=".png, .jpg, .jpeg, .webp"
              onChange={handleFileChange}
            />
            {imageSrc && imageSrc.trim() !== "" && (
              <img src={imageSrc} alt="Aperçu de la recette" />
            )}
          </label>

          <div className="guest-duration">
            <label htmlFor="guestNumber">
              <h3>Nombre de personnes</h3>
              <select name="guest_number" id="guestNumber" required>
                <option value={0}>Sélectionnez le nombre de personnes</option>
                {guestOptions.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="duration">
              <h3>Durée</h3>
              <input
                type="time"
                name="duration"
                id="duration"
                defaultValue={"00:00"}
              />
            </label>
          </div>

          <label htmlFor="ingredient">
            <h3>Les ingrédients</h3>
            <Autocomplete
              freeSolo
              options={availableIngredients}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.name
              }
              isOptionEqualToValue={(option, value) => {
                const optionName =
                  typeof option === "string" ? option : option.name;
                const valueName =
                  typeof value === "string" ? value : value.name;
                return optionName === valueName;
              }}
              value={selectedIngredient}
              onChange={handleIngredientChange}
              renderInput={(params) => (
                <TextField {...params} label="ingrédients" />
              )}
            />
          </label>

          <div className="ingredient-inputs">
            <input
              type="number"
              id="quantity"
              placeholder="quantité ex: 200"
              min="0"
              max={5000}
              value={currentQuantity}
              onChange={(e) => setCurrentQuantity(e.target.value)}
            />

            <select
              id="unit"
              value={currentUnit}
              onChange={(e) => setCurrentUnit(e.target.value)}
              aria-label="Sélectionnez l'unité"
            >
              <option value="">Sélectionnez une unité</option>
              {availableUnit.map((unit) => (
                <option key={unit.name} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>

            <button type="button" onClick={addIngredient}>
              Ajouter
            </button>
          </div>

          {ingredients.length > 0 && (
            <fieldset name="ingredients">
              <legend>Ingrédients ajoutés</legend>
              {ingredients.map((ingredient) => {
                const ingUnit = availableUnit.find(
                  (unit) => unit.id === Number(ingredient.unit),
                );
                return (
                  <p key={ingredient.id}>
                    {ingredient.quantity} {ingUnit?.name} de {ingredient.name}
                    <button
                      type="button"
                      onClick={() => removeIngredient(ingredient.id)}
                      className="remove-ingredient-btn"
                    >
                      Supprimer
                    </button>
                  </p>
                );
              })}
            </fieldset>
          )}

          {steps.map((step, index) => (
            <fieldset key={step.id}>
              <legend>
                Étape {index + 1}
                {steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(step.id)}
                    className="remove-step-btn"
                  >
                    Supprimer
                  </button>
                )}
              </legend>
              <textarea
                name={`instruction ${index + 1}`}
                id={`step-${step.id}`}
                placeholder={`Saisissez la préparation de l'étape ${index + 1}`}
                minLength={5}
                maxLength={1000}
              />
            </fieldset>
          ))}
          <div className="buttons">
            <button type="button" onClick={addStep}>
              Ajouter une étape
            </button>

            <button type="submit">Poster la recette</button>
          </div>
        </form>
      ) : (
        <div>
          <h2>Poster une recette</h2>
          <span>Veuillez vous connecter pour ajouter une recette</span>
        </div>
      )}
    </article>
  );
};

export default NewRecipes;
