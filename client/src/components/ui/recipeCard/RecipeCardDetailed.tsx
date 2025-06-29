import { GuestsIcon, StarIcon } from "../Icons/Icons";
import type { RecipeDetailed } from "./data/recipeCardType";
import "./RecipeCardDetailed.css";

const RecipeCardDetailed = ({ recipe }: { recipe: RecipeDetailed }) => {
  const starIndex = [1, 2, 3, 4, 5];
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

        <div>
          <div>
            <GuestsIcon width="20px" height="20px" />
            <span>{recipe.guestNumber}</span>
          </div>

          <span>{recipe.price && '€'.repeat(recipe.price)}</span>

          <span>&#60; {recipe.duration} min</span>

          <div className="ranking-wrapper">
            <div className="stars-container-filled" style={{ width: recipe.usersAverage ? `${recipe.usersAverage / 5 * 100}%` : 0 }}>
              {starIndex.map((i) => {
                return (
                  <StarIcon key={i} height="24px" width="24px" className="star-filled-users" />
                )
              })}
            </div>
            <div className="stars-container-empty">
              {starIndex.map((i) => {
                return (
                  <StarIcon key={i} height="24px" width="24px" className="star-empty" />
                )
              })}
            </div>
          </div>

          <div className="ranking-wrapper">
            <div className="stars-container-filled" style={{ width: recipe.ecoAverage ? `${recipe.ecoAverage / 5 * 100}%` : 0 }}>
              {starIndex.map((i) => {
                return (
                  <StarIcon key={i} height="24px" width="24px" className="star-filled-eco" />
                )
              })}
            </div>
            <div className="stars-container-empty">
              {starIndex.map((i) => {
                return (
                  <StarIcon key={i} height="24px" width="24px" className="star-empty" />
                )
              })}
            </div>
          </div>

          <div className="ranking-wrapper">
            <div className="stars-container-filled" style={{ width: recipe.nutritionAverage ? `${recipe.nutritionAverage / 5 * 100}%` : 0 }}>
              {starIndex.map((i) => {
                return (
                  <StarIcon key={i} height="24px" width="24px" className="star-filled-nut" />
                )
              })}
            </div>
            <div className="stars-container-empty">
              {starIndex.map((i) => {
                return (
                  <StarIcon key={i} height="24px" width="24px" className="star-empty" />
                )
              })}
            </div>
          </div>

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
    </section >
  );
};

export default RecipeCardDetailed;