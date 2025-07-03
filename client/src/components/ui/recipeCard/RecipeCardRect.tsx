import type { RecipeBase } from "./data/recipeCardType";
import "./recipeCardRect.css";

const RecipeCardRect = ({ recipe }: { recipe: RecipeBase }) => {
  return (
    <figure className="recipe-card-rect">
      <div>
        <img src={recipe.image} alt={recipe.name} />
      </div>
      <figcaption>{recipe.name}</figcaption>
    </figure>
  );
};

export default RecipeCardRect;
