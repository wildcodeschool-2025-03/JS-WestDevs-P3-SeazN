import type { RecipeBase } from "./data/recipeCardType";

const RecipeCardPreview = ({ recipe }: { recipe: RecipeBase }) => {
  return (
    <p>
      id : {recipe.id}
      name : {recipe.name}
      image : {recipe.image}
    </p>
  );
};

export default RecipeCardPreview;
