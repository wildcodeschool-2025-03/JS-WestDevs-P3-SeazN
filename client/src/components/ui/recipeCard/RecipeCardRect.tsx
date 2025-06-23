import type { RecipeBase } from "./data/recipeCardType";
import "./RecipeCardRect.css";

const RecipeCardRect = ({ recipe }: { recipe: RecipeBase }) => {
  return (
    <figure className="recipe-card-rect">
      <div className="rect-img-wrapper">
        <img src={recipe.image} alt={recipe.name} />
      </div>
      <figcaption>{recipe.name}</figcaption>
    </figure>
  );
};

export default RecipeCardRect;
