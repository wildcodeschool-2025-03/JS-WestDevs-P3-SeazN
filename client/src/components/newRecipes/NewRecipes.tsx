import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./NewRecipes.css";

const NewRecipes = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [guestNumber, setGuestNumber] = useState(0);
  const [duration, setDuration] = useState("00:00");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [availableIngredients, setAvailableIngredients] = useState<
    Ingredient[]
  >([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [currentQuantity, setCurrentQuantity] = useState("");
  const [currentUnit, setCurrentUnit] = useState("");
  const [availableUnit, setAvailableUnit] = useState<{ name: string }[]>([]);
  const [steps, setSteps] = useState([{ id: 1, content: "" }]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const guestOptions = [2, 4, 6, 8, 10, 12];

  const success = () =>
    toast.success("Bravo, vous avez réussi à créer une nouvelle recette 🎉");
  const error = () => toast.error("La création de la recette a échoué 😩");

  const handleSubmit = (formData: FormData) => {
    const formObj = Object.fromEntries(formData);
    const formRecipe = JSON.parse(JSON.stringify(formObj));

    setImageSrc("");
    formRecipe.image = imageFile;
    setGuestNumber(0);
    setDuration("00:00");
    formRecipe.duration += ":00";
    setIngredients([]);
    formRecipe.ingrédient = ingredients;
    setSteps([{ id: 1, content: "" }]);

    fetch(`${apiUrl}/api/newRecipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formRecipe,
    }).then((res) => (res.ok ? success() : error()));

    console.log("je suis la recette", formRecipe);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.files &&
      setImageSrc(URL.createObjectURL(event.target.files[0]));
    event.target.files && setImageFile(event.target.files[0]);
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
    if (selectedIngredient && currentQuantity && currentUnit) {
      const newIngredient = {
        id: Date.now(),
        name: selectedIngredient,
        quantity: currentQuantity,
        unit: currentUnit,
      };
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
      setSelectedIngredient("");
      setCurrentQuantity("");
      setCurrentUnit("");
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

  useEffect(() => {
    fetch(`${apiUrl}/api/ingredients`)
      .then((res) => res.json())
      .then((data) => setAvailableIngredients(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des ingrédients:", error),
      );

    fetch(`${apiUrl}/api/unit`)
      .then((res) => res.json())
      .then((data) => setAvailableUnit(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des unités:", error),
      );
  }, []);

  return (
    <article className="new-recipes">
      <form action={handleSubmit}>
        <h2>Poster une recette</h2>

        <label htmlFor="recipeName">
          <h3>La recette</h3>
          <input
            type="text"
            id="recipeName"
            name="name"
            placeholder="Nom de la recette"
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
            <select
              name="guest_number"
              id="guestNumber"
              value={guestNumber}
              onChange={(e) => setGuestNumber(Number(e.target.value))}
            >
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
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
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
              const valueName = typeof value === "string" ? value : value.name;
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
              <option key={unit.name} value={unit.name}>
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
            {ingredients.map((ingredient) => (
              <p key={ingredient.id}>
                {ingredient.quantity} {ingredient.unit} de {ingredient.name}
                <button
                  type="button"
                  onClick={() => removeIngredient(ingredient.id)}
                  className="remove-ingredient-btn"
                >
                  Supprimer
                </button>
              </p>
            ))}
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
    </article>
  );
};

export default NewRecipes;
