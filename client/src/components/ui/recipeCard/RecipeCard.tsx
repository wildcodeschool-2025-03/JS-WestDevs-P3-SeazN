import RecipeCardDetailed from "./RecipeCardDetailed";
import RecipeCardMini from "./RecipeCardMini";
import RecipeCardPreview from "./RecipeCardPreview";
import type { RecipeCardProps } from "./data/recipeCardType";



const RecipeCard = ({ variant, recipe }: RecipeCardProps) => {
  /* 
  A mettre dans les components parents en fonction de ce qu'on veut
  const [recipeList, setRecipeList] = useState<RecipeCardProps>([]);

  useEffect(() => {
    fetch("http://localhost:3310/ACOMPLETER")
      .then((res) => res.json())
      .then((recipeList) => setRecipeList(recipeList));
  }, []); 
  */

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
