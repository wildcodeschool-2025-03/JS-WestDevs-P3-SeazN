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
          nutritionAverage: Number(data.nutrition_average),
          ecoAverage: Number(data.eco_average),
          instructions: data.instructions.map(
            (instruction: { step_order: number; content: string }) => ({
              stepOrder: instruction.step_order,
              content: instruction.content,
            }),
          ),
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
