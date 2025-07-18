import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type {
  RecipeCardDetailed,
  RecipeDetailed,
} from "../../../src/components/ui/recipeCard/data/recipeCardType";
import RecipeCard from "../../components/ui/recipeCard/RecipeCard";

const RecipeDetailedComplet = () => {
  const [recipeDetailed, setRecipeDetailed] = useState<RecipeDetailed | null>(
    null,
  );
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3310/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipeDetailed(data));
  }, [id]);

  if (!recipeDetailed) {
    return <p>Chargement...</p>;
  }

  const cardProps: RecipeCardDetailed = {
    variant: "detailed",
    recipe: recipeDetailed,
  };

  return (
    <section>
      <RecipeCard {...cardProps} />
    </section>
  );
};

export default RecipeDetailedComplet;
