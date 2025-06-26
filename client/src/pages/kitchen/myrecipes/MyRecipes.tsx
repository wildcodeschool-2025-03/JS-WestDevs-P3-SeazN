import { useState } from "react";
import "./MyRecipes.css";



const MyRecipes = () => {
  const [recipeName, setRecipeName] = useState("");

  const handleSubmit = (event) => event.preventDefault();
  const MAX_LENGTH = 40
  const handleChange = (event) => {
    if (event.target.value.length <= MAX_LENGTH)
    setRecipeName(event.target.value);
  };

  return (
    <section className="myRecipes">
      <article>
        <h2>Mes recettes favorites</h2>
      </article>
      <article>
        <h2>Mes recettes ajoutées</h2>
      </article>
      <article>
        <form onSubmit={handleSubmit}>
          <h2>Poster une recette</h2>
          <label htmlFor="recipeName">
            <h3>La recette</h3>
          </label>
          <input
            type="text"
            id="recipeName"
            name="recipeName"
            placeholder="nom de la recette"
            value={recipeName}
            onChange={handleChange}
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
          </label>
          <input
            type="url"
            name="image"
            id="image"
            placeholder="https://example.png"
          />
          <button type="button">Ajouter</button>
          <label htmlFor="ingredient">
            <h3>Les ingrédients</h3>
          </label>
          <input
            type="number"
            name="unit"
            id="unit"
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
          <label htmlFor="step">
            <h4>Étape 2</h4>
          </label>
          <textarea
            name="step"
            id="step"
            placeholder="Saisissez la préparation de l'étape 2"
          />
          <br />
          <button type="button">Ajouter une étape</button>
          <button type="submit">Poster la recette</button>
        </form>
      </article>
    </section>
  );
};

export default MyRecipes;
