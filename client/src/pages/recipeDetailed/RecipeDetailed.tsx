import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { RecipeDetailed } from "../../../src/components/ui/recipeCard/data/recipeCardType";
import RecipeCard from "../../components/ui/recipeCard/RecipeCard";

const RecipeDetailedComplet = () => {
  const [recipeDetailed, setRecipeDetailed] = useState<RecipeDetailed | null>(
    null,
  );
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3310/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const transformedData = {
          ...data,

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
