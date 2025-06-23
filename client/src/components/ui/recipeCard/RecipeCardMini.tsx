import type { RecipeBase } from "./data/recipeCardType";
import "./RecipeCardMini.css"

const RecipeCardMini = ({ recipe }: { recipe: RecipeBase }) => {
  return (
    <figure className="recipe-card-mini">
      <div className="mini-img-wrapper">
        <img src={recipe.image} alt={recipe.name} />
      </div>
      <figcaption>{recipe.name}</figcaption>
    </figure>
  );
};



export default RecipeCardMini;
