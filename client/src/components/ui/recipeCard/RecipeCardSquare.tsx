import type { RecipeBase } from "./data/recipeCardType";
import "./RecipeCardSquare.css";

const RecipeCardSquare = ({ recipe }: { recipe: RecipeBase }) => {
  return (
    <figure className="recipe-card-square">
      <div className="square-img-wrapper">
        <img src={recipe.image} alt={recipe.name} />
      </div>
      <figcaption>{recipe.name}</figcaption>
    </figure>
  );
};

export default RecipeCardSquare;
