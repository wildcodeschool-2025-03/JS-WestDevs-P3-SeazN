import type { RecipeBase } from "./data/recipeCardType";
import "./RecipeCardPreview.css"

const RecipeCardPreview = ({ recipe }: { recipe: RecipeBase }) => {
  return (
    <figure className="recipe-card-preview">
      <div className="img-wrapper">
        <img src={recipe.image} alt={recipe.name} />
      </div>
    </figure>
  );
};

export default RecipeCardPreview;
