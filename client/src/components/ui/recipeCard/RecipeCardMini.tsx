import type { RecipeBase } from "./data/recipeCardType";

const RecipeCardMini = ({ recipe }: { recipe: RecipeBase }) => {
  return (
    <p>
      id : {recipe.id}
      name : {recipe.name}
      image : {recipe.image}
    </p>
  );
};

export default RecipeCardMini;
