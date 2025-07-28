import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { RecipeDetailed } from "../../../src/components/ui/recipeCard/data/recipeCardType";
import RecipeCard from "../../components/ui/recipeCard/RecipeCard";

const RecipeDetailedComplet = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [recipeDetailed, setRecipeDetailed] = useState<RecipeDetailed | null>(
    null,
  );
  const { id } = useParams();

  useEffect(() => {
    fetch(`${apiUrl}/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const transformedData = {
          ...data,
          usersAverage: Number(data.user_ratings),
          nutrition_average: Number(data.nutrition_average),
          eco_average: Number(data.eco_average),
        };

        setRecipeDetailed(transformedData);
      });
  }, [id]);

  if (!recipeDetailed) {
    return <p>Chargement...</p>;
  }
  return (
    <section>
      <RecipeCard variant="detailed" recipe={recipeDetailed} />
    </section>
  );
};

export default RecipeDetailedComplet;
