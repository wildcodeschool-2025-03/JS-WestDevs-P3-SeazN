import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { GuestsIcon, HeartIcon, StarIcon } from "../Icons/Icons";
import type { RecipeDetailed } from "./data/recipeCardType";
import "./recipeCardDetailed.css";

const RecipeCardDetailed = ({ recipe }: { recipe: RecipeDetailed }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useAuth();

  const starIndex = [1, 2, 3, 4, 5];
  recipe.instructions?.sort((a, b) => a.stepOrder - b.stepOrder);

  const [isFavorite, setIsFavorite] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchFavoriteStatus = async () => {
      try {
        setIsLoading(true);
        const statusRes = await fetch(
          `${apiUrl}/api/user/${user?.id}/favorites/${recipe.id}`,
        );
        const status = await statusRes.json();
        setIsFavorite(status);
      } catch (err) {
        console.log("Erreur de chargement du statut favoris : ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteStatus();
  }, [user, recipe.id]);

  const handleFavorite = async () => {
    const newStatus = !isFavorite;
    setIsFavorite(newStatus);

    try {
      await fetch(`${apiUrl}/api/user/${user?.id}/favorites/${recipe.id}`, {
        method: newStatus ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log("Erreur de mise à jour du statut favoris : ", err);
      setIsFavorite(!newStatus);
    }
  };

  const formatDuration = (duration: string): string => {
    if (!duration) return "";

    const [hours, minutes] = duration.split(":").map(Number);

    if (hours === 0) {
      return `${minutes} min`;
    }

    if (minutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h${minutes < 10 ? `0${minutes}` : minutes}`;
  };

  return (
    <section className="recipe-card-detailed">
      <div>
        <figure>
          <img src={recipe.image ?? undefined} alt={recipe.name} />
        </figure>

        <div>
          <h2>{recipe.name}</h2>
          {user && (isLoading ? (
            <span>Chargement des favoris</span>
          ) : (
            <button
              type="button"
              onClick={() => handleFavorite()}
              aria-label={
                isFavorite
                  ? "Retirer des recettes favorites"
                  : "Ajouter aux recettes favorites"
              }
              aria-pressed={isFavorite}
            >
              <HeartIcon
                fill={isFavorite ? "var(--light-secondary)" : "none"}
              />
            </button>
          ))}
        </div>
        <div>
          <div>
            <GuestsIcon />
            <span>{recipe.guestNumber}</span>
          </div>

          <span>{recipe.price && "€".repeat(recipe.price)}</span>
          <span>&#60; {formatDuration(recipe.duration)}</span>

          <div>
            <div
              style={{
                width: recipe.usersAverage
                  ? `${(recipe.usersAverage / 5) * 100}%`
                  : 0,
              }}
            >
              {starIndex.map((i) => (
                <StarIcon key={i} className="star-filled-users" />
              ))}
            </div>
            <div>
              {starIndex.map((i) => (
                <StarIcon key={i} />
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                width: recipe.ecoAverage
                  ? `${(recipe.ecoAverage / 5) * 100}%`
                  : 0,
              }}
            >
              {starIndex.map((i) => (
                <StarIcon key={i} className="star-filled-eco" />
              ))}
            </div>
            <div>
              {starIndex.map((i) => (
                <StarIcon key={i} />
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                width: recipe.nutritionAverage
                  ? `${(recipe.nutritionAverage / 5) * 100}%`
                  : 0,
              }}
            >
              {starIndex.map((i) => (
                <StarIcon key={i} className="star-filled-nut" />
              ))}
            </div>
            <div>
              {starIndex.map((i) => (
                <StarIcon key={i} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3>Ingrédients</h3>
          <ul>
            {recipe.ingredients?.map(({ id, quantity, unit, name }) => {
              const displayedQuantity = quantity ?? "";
              const displayedUnit = unit && unit !== "pièce(s)" ? unit : "";
              const needsLink = unit && unit !== "pièce(s)" ? "de " : "";

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
          {recipe.instructions?.map(({ id, stepOrder, content }) => (
            <li key={id}>
              <h4>Étape {stepOrder}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RecipeCardDetailed;
