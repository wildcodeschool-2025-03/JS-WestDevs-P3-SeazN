import type { RecipeDetailed } from "./data/recipeCardType";
import "./RecipeCardDetailed.css";

const RecipeCardDetailed = ({ recipe }: { recipe: RecipeDetailed }) => {
  return (
    <section className="recipe-card-detailed">
      <div>
        <div className="global">
          <figure>
            <img
              src={recipe.image ? recipe.image : undefined}
              alt={recipe.name}
            />
          </figure>
          <div>
            <h2>{recipe.name}</h2>
            {/* Créer logos différents pour chaque. data tableau d'objet ? grid 2x2 */}
            <span>{recipe.guestNumber}</span>
            <span>{recipe.price}</span>
            <span>{recipe.duration}</span>
            <span>{recipe.ranking}</span> {/* A ajouter */}
          </div>
        </div>
        <section className="ingredients">
          <h3>Les ingrédients</h3>
          {/* recipe.ingredients.map() */}
        </section>
      </div>
      <section className="Steps">
        <h3>Préparation</h3>
        {/* recipe.instructions.map() */}
      </section>
    </section>
  );
};

export default RecipeCardDetailed;
