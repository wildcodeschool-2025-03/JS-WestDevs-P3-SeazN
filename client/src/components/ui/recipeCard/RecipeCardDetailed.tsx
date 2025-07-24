import { useState } from "react";
import { GuestsIcon, HeartIcon, StarIcon } from "../Icons/Icons";
import type { RecipeDetailed } from "./data/recipeCardType";
import "./recipeCardDetailed.css";

const RecipeCardDetailed = ({ recipe }: { recipe: RecipeDetailed }) => {
  const starIndex = [1, 2, 3, 4, 5];
  recipe.instructions?.sort((a, b) => a.stepOrder - b.stepOrder);

  const [isFavorite, setIsFavorite] = useState<boolean>();

  return (
    <section className="recipe-card-detailed">
      <div>
        <figure>
          <img
            src={recipe.image ? recipe.image : undefined}
            alt={recipe.name}
          />
        </figure>

        <div>
          <h2>{recipe.name}</h2>
          <button
            type="button"
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label={
              isFavorite
                ? "Retirer des recettes favorites"
                : "Ajouter aux recettes favorites"
            }
            aria-pressed={isFavorite}
          >
            <HeartIcon fill={isFavorite ? "var(--light-secondary)" : "none"} />
          </button>
        </div>
        <div>
          <div>
            <GuestsIcon />
            <span>{recipe.guest_number}</span>
          </div>

          <span>{recipe.price && "€".repeat(recipe.price)}</span>

          <span>&#60; {recipe.duration} min</span>

          {/* Ranking details */}

          <div>
            {/* Filled stars */}
            <div
              style={{
                width: recipe.usersAverage
                  ? `${(recipe.usersAverage / 5) * 100}%`
                  : 0,
              }}
            >
              {starIndex.map((i) => {
                return <StarIcon key={i} className="star-filled-users" />;
              })}
            </div>
            {/* Empty stars */}
            <div>
              {starIndex.map((i) => {
                return <StarIcon key={i} />;
              })}
            </div>
          </div>

          <div>
            {/* Filled stars */}
            <div
              style={{
                width: recipe.eco_average
                  ? `${(recipe.eco_average / 5) * 100}%`
                  : 0,
              }}
            >
              {starIndex.map((i) => {
                return <StarIcon key={i} className="star-filled-eco" />;
              })}
            </div>
            {/* Empty stars */}
            <div>
              {starIndex.map((i) => {
                return <StarIcon key={i} />;
              })}
            </div>
          </div>

          <div>
            {/* Filled stars */}
            <div
              style={{
                width: recipe.nutrition_average
                  ? `${(recipe.nutrition_average / 5) * 100}%`
                  : 0,
              }}
            >
              {starIndex.map((i) => {
                return <StarIcon key={i} className="star-filled-nut" />;
              })}
            </div>
            {/* Empty stars */}
            <div>
              {starIndex.map((i) => {
                return <StarIcon key={i} />;
              })}
            </div>
          </div>
        </div>

        <div>
          <h3>Ingrédients</h3>
          <ul>
            {recipe.ingredients?.map((ingredient) => {
              const { id, quantity, unit, name } = ingredient;
              const displayedQuantity = quantity != null ? quantity : "";
              const displayedUnit =
                unit != null && unit !== "pièce(s)" ? unit : "";
              const needsLink =
                unit && unit !== null && unit !== "pièce(s)" ? "de " : "";

              return (
                <li key={id}>
                  {`${displayedQuantity} ${displayedUnit} ${needsLink}${name}`}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div>
        <h3>Préparation</h3>
        <ul>
          {recipe.instructions?.map((instruction) => {
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
