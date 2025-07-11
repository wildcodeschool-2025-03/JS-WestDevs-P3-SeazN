import { useState } from "react";
import "./NewRecipes.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const NewRecipes = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [guestNumber, setGuestNumber] = useState<number>(0);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [ingredients, setIngredients] = useState<
    {
      id: number;
      name: string;
      quantity: string;
      unit: string;
    }[]
  >([]);
  const [currentQuantity, setCurrentQuantity] = useState("");
  const [currentUnit, setCurrentUnit] = useState("");
  const [steps, setSteps] = useState([{ id: 1, content: "" }]);

  const handleSubmit = (formData: FormData) => {
    const formObj = Object.fromEntries(formData);
    const formRecipe = JSON.parse(JSON.stringify(formObj));

    formRecipe.ingrédient = ingredients;
    formRecipe.image = imageFile;
    setImageSrc("");
    setGuestNumber(0);
    setIngredients([]);
    setSteps([{ id: 1, content: "" }]);

    console.log("Je suis formRecipe", formRecipe);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.files &&
      setImageSrc(URL.createObjectURL(event.target.files[0]));
    event.target.files && setImageFile(event.target.files[0]);
  };

  const handleIngredientChange = (
    _event: React.SyntheticEvent,
    value: string | null,
  ) => {
    setSelectedIngredient(value || "");
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

  const ingrédient = [
    "carotte",
    "poulet",
    "curry",
    "lait",
    "champignon",
    "sel",
    "poivre",
    "huile",
    "pomme de terre",
  ];

  return (
    <article className="newRecipes">
      <form action={handleSubmit}>
        <h2>Poster une recette</h2>

        <label htmlFor="recipeName">
          <h3>La recette</h3>
        </label>

        <input
          type="text"
          id="recipeName"
          name="recipeName"
          placeholder="Nom de la recette"
        />

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
          )}{" "}
        </label>

        <label htmlFor="guestNumber">
          <h3>Nombre de personnes</h3>
        </label>
        <select
          name="guestNumber"
          id="guestNumber"
          value={guestNumber}
          onChange={(e) => setGuestNumber(Number(e.target.value))}
        >
          <option value={0}>Sélectionné le nombre de personnes</option>
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={8}>8</option>
          <option value={10}>10</option>
          <option value={12}>12</option>
        </select>

        <label htmlFor="ingredient">
          <h3>Les ingrédients</h3>
        </label>
        <Autocomplete
          freeSolo
          options={ingrédient}
          value={selectedIngredient}
          onChange={handleIngredientChange}
          renderInput={(params) => (
            <TextField {...params} label="ingrédients" />
          )}
        />

        <div className="ingredient-inputs">
          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="quantité ex: 200"
            min="0"
            value={currentQuantity}
            onChange={(e) => setCurrentQuantity(e.target.value)}
          />

          <select
            name="unit"
            id="unit"
            value={currentUnit}
            onChange={(e) => setCurrentUnit(e.target.value)}
            aria-placeholder="Selectionné l'unité"
          >
            <option value="">selectionné l'unité</option>
            <option value="gramme(s)">g</option>
            <option value="centilitre(s)">cl</option>
            <option value="cuillière(s) à café">cuillière(s) à café</option>
            <option value="cuillière(s) à soupe">cuillière(s) à soupe</option>
            <option value="piece(s)">pièce(s)</option>
            <option value="portion(s)">portion(s)</option>
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
              name={`step-${index + 1}`}
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
