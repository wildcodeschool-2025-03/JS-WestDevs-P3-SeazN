import { useEffect, useState } from "react";
import NewRecipes from "../../../components/newRecipes/NewRecipes";
import RecipeCard from "../../../components/ui/recipeCard/RecipeCard";
import type { RecipeBase } from "../../../components/ui/recipeCard/data/recipeCardType";
import { useAuth } from "../../../contexts/AuthContext";
import "./MyRecipes.css";
import { Link } from "react-router";

const MyRecipes = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useAuth();
  const [favoriteList, setFavoriteList] = useState<RecipeBase[]>();
  const [addedList, setAddedList] = useState<RecipeBase[]>();
  const [isLoadingFav, setIsLoadingFav] = useState<boolean>();
  const [isLoadingAdded, setIsLoadingAdded] = useState<boolean>();

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchFavorites = async () => {
      try {
        setIsLoadingFav(true);
        const favListRes = await fetch(
          `${apiUrl}/api/user/${user.id}/favorites`,
        );
        const favList = await favListRes.json();
        setFavoriteList(favList);
      } catch (err) {
        console.error("Erreur de chargement des recettes favorites : ", err);
      } finally {
        setIsLoadingFav(false);
      }
    };

    const fetchAdded = async () => {
      try {
        setIsLoadingAdded(true);
        const addedListRes = await fetch(
          `${apiUrl}/api/user/${user.id}/my-recipes`,
        );
        const addedList = await addedListRes.json();
        setAddedList(addedList);
      } catch (err) {
        console.log("Erreur de chargement des recettes ajoutées : ", err);
      } finally {
        setIsLoadingAdded(false);
      }
    };

    fetchAdded();
    fetchFavorites();
  }, [user]);

  return (
    <section className="my-recipes">
      <article>
        <h2>Mes recettes favorites</h2>
        <div>
          {user ? (
            isLoadingFav ? (
              <span>Chargement des favoris</span>
            ) : favoriteList && favoriteList.length > 0 ? (
              favoriteList?.map((recipe) => (
                <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                  <RecipeCard variant="rect" recipe={recipe} />
                </Link>
              ))
            ) : (
              <span>Aucune recette favorite</span>
            )
          ) : (
            <span>
              Veuillez vous connecter pour visualiser vos recettes favorites
            </span>
          )}
        </div>
      </article>
      <article>
        <h2>Mes recettes ajoutées</h2>
        <div>
          {user ? (
            isLoadingAdded ? (
              <span>Chargement des recettes ajoutées</span>
            ) : addedList && addedList.length > 0 ? (
              addedList?.map((recipe) => (
                <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                  <RecipeCard variant="rect" recipe={recipe} />
                </Link>
              ))
            ) : (
              <span>Aucune recette ajoutée</span>
            )
          ) : (
            <span>
              Veuillez vous connecter pour visualiser vos recettes ajoutées
            </span>
          )}
        </div>
      </article>
      <NewRecipes />
    </section>
  );
};

export default MyRecipes;
