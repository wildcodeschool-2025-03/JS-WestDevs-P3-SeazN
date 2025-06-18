import type { RecipeDetailed } from "./data/recipeCardType";

const RecipeCardDetailed = ({ recipe }: { recipe: RecipeDetailed }) => {
  return (
    <p>
      id : {recipe.id}
      name : {recipe.name}
      image : {recipe.image}
      price : {recipe.price}
      guests number : {recipe.guestNumber}
      duration : {recipe.duration}
    </p>
  );
};

export default RecipeCardDetailed;
