import RecipeCardDetailed from "./RecipeCardDetailed";
import RecipeCardMini from "./RecipeCardMini";
import RecipeCardPreview from "./RecipeCardPreview";
import type { RecipeCardProps } from "./data/recipeCardType";

const RecipeCard = ({ variant, recipe }: RecipeCardProps) => {
  switch (variant) {
    case "mini":
      return <RecipeCardMini recipe={recipe} />;
    case "preview":
      return <RecipeCardPreview recipe={recipe} />;
    case "detailed":
      return <RecipeCardDetailed recipe={recipe} />;
    default:
      return <p>Erreur chargement de recette</p>;
  }
};

export default RecipeCard;
