import type { RecipeBase } from "./data/recipeCardType";
import "./RecipeCardPreview.css"

const RecipeCardPreview = ({ recipe }: { recipe: RecipeBase }) => {
  return (
    <figure className="recipe-card-preview">
      <img src={recipe.image} alt={recipe.name} />
    </figure>
  );
};

export default RecipeCardPreview;
