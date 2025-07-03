import type { RecipeBase } from "./data/recipeCardType";
import "./recipeCardMini.css";

const RecipeCardMini = ({ recipe }: { recipe: RecipeBase }) => {
  return (
    <figure className="recipe-card-mini">
      <img src={recipe.image} alt={recipe.name} />
    </figure>
  );
};

export default RecipeCardMini;
