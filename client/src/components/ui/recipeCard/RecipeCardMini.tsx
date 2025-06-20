import type { RecipeBase } from "./data/recipeCardType";
import "./RecipeCardMini.css"

const RecipeCardMini = ({ recipe }: { recipe: RecipeBase }) => {
  return (
    <section className=".recipe-card-mini">
      id : {recipe.id}
      name : {recipe.name}
      image : {recipe.image}
    </section>
  );
};

export default RecipeCardMini;
