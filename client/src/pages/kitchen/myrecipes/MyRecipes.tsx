import { useState } from "react";
import "./MyRecipes.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const MyRecipes = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [steps, setSteps] = useState([{ id: 1, content: "" }]);

  const handleSubmit = (formData: FormData) => {
    const formObj = Object.fromEntries(formData);
    const formRecipe = JSON.parse(JSON.stringify(formObj));

    setImageSrc("");
    for (const [key, value] of Object.entries(formRecipe)) {
      if (value === "on") {
        formRecipe[key] = true;
      }
    }

    if (selectedIngredient) {
      formRecipe.ingrédient = selectedIngredient;
    }

    console.log("Je suis formReciep");
    console.log(formRecipe);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageSrc(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleIngredientChange = (
    _event: React.SyntheticEvent,
    value: string | null,
  ) => {
    setSelectedIngredient(value || "");
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

  const ingrédient = ["carotte", "poulet", "curry"];

  return (
    <section className="myRecipes">
      <article>
        <h2>Mes recettes favorites</h2>
      </article>

      <article>
        <h2>Mes recettes ajoutées</h2>
      </article>

      <article>
        <form action={handleSubmit}>
          <h2>Poster une recette</h2>

          <label htmlFor="recipeName">
            <h3>La recette</h3>
          </label>

          <input
            type="text"
            id="recipeName"
            name="recipeName"
            placeholder="nom de la recette"
          />

          <h3>les catégories</h3>

          <input type="checkbox" name="végan" id="végan" />
          <label htmlFor="végan">Végan</label>

          <input type="checkbox" name="végétarien" id="végétarien" />
          <label htmlFor="végétarien">Végétarien</label>

          <input type="checkbox" name="glutenFree" id="glutenFree" />
          <label htmlFor="glutenFree">Sans gluten</label>

          <label htmlFor="image">
            <h3>La photo</h3>
            <input
              type="file"
              name="image"
              id="image"
              accept=".png, .jpg, .jepg, .webp"
              onChange={handleFileChange}
            />
            <img src={imageSrc} alt="your upload" />
          </label>

          <label htmlFor="ingredient">
            <h3>Les ingrédients</h3>
          </label>
          <Autocomplete
            freeSolo
            options={ingrédient}
            onChange={handleIngredientChange}
            renderInput={(params) => (
              <TextField {...params} label="ingrédient" />
            )}
          />

          <br />

          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="200"
            min="0"
          />

          <select name="unit" id="unit">
            <option value="gram">g</option>
            <option value="centilitre">cl</option>
            <option value="teaspoon">cuillière(s) à café</option>
            <option value="tablespoon">cuillière(s) à soupe</option>
            <option value="piece">pièce(s)</option>
            <option value="portion">portion(s)</option>
          </select>

          <button type="button">Ajouter</button>

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

          <br />
          <button type="button" onClick={addStep}>
            Ajouter une étape
          </button>

          <button type="submit">Poster la recette</button>
        </form>
      </article>
    </section>
  );
};

export default MyRecipes;
