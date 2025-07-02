import { useState } from "react";
import "./MyRecipes.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const MyRecipes = () => {
  const [imageSrc, setImageSrc] = useState("");
  // const [value, setValue] = useState(0);

  const handleSubmit = (formData: FormData) => {
    const formObj = Object.fromEntries(formData);

    setImageSrc("");
    for (const [key, value] of Object.entries(formObj)) {
      if (value === "on") {
        formObj[key] = true;
      }
    }
    console.log(formObj);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageSrc(URL.createObjectURL(event.target.files[0]));
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
              onChange={handleChange}
            />
            <img src={imageSrc} alt="your upload" />
          </label>

          <label htmlFor="ingredient">
            <h3>Les ingrédients</h3>
          </label>
          <Autocomplete
            sx={(theme) => ({
              display: "inline-block",
              "& input": {
                width: 700,
                bgcolor: "background.paper",
                color: theme.palette.getContrastText(
                  theme.palette.background.paper,
                ),
              },
            })}
            freeSolo
            options={ingrédient}
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
          <input
            type="search"
            name="ingrédient"
            id="ingrédient"
            placeholder="nom de l'ingrédient"
          />
          <button type="button">Ajouter</button>
          <label htmlFor="step">
            <h4>Étape 1</h4>
          </label>
          <textarea
            name="step"
            id="step"
            placeholder="Saisissez la préparation de l'étape 1"
          />
          {/* <label htmlFor="step">
            <h4>Étape 2</h4>
          </label>
          <textarea
            name="step"
            id="step"
            placeholder="Saisissez la préparation de l'étape 2"
          /> */}
          <br />
          
          <button type="button">Ajouter une étape</button>
          <button type="submit">Poster la recette</button>
        </form>
      </article>
    </section>
  );
};

export default MyRecipes;
