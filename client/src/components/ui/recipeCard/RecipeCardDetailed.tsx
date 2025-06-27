import type { RecipeDetailed } from "./data/recipeCardType";
import "./RecipeCardDetailed.css";

const RecipeCardDetailed = ({ recipe }: { recipe: RecipeDetailed }) => {

  recipe.instructions.sort((a, b) => a.stepOrder - b.stepOrder);

  return (
    <section className="recipe-card-detailed">
      <div>

        <figure>
          <img
            src={recipe.image ? recipe.image : undefined}
            alt={recipe.name}
          />
        </figure>

        <h2>{recipe.name}</h2>
        {/* Créer logos différents pour chaque. data tableau d'objet ? grid 2x2 */}

        <div>
          <span>nb : {recipe.guestNumber}</span>
          <span>price : {recipe.price}</span>
          <span>duration : {recipe.duration}</span>
          <span>nut avg : {recipe.nutritionAverage}</span>
          <span>eco avg : {recipe.ecoAverage}</span>
        </div>


        <div>
          <h3>Ingrédients</h3>
          <ul>
            {recipe.ingredients.map((ingredient) => {
              const { id, quantity, unit, name } = ingredient;
              const displayedQuantity = quantity != null ? quantity : "";
              const displayedUnit = unit != null && unit !== "pièce(s)" ? unit : "";
              const needsLink = unit && unit !== null && unit !== "pièce(s)" ? "de " : "";

              return (
                <li key={id}>
                  {`${displayedQuantity} ${displayedUnit} ${needsLink}${name}`}
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div>
        <h3>Préparation</h3>
        <ul>
          {recipe.instructions.map((instruction) => {
            return (
              <li key={instruction.id}>
                <h4>Étape {instruction.stepOrder}</h4>
                <p>{instruction.content}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default RecipeCardDetailed;