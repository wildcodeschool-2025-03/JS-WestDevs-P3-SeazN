import { useEffect, useState } from "react";
import NewRecipes from "../../../components/newRecipes/NewRecipes";
import { useAuth } from "../../../contexts/AuthContext";
import "./MyRecipes.css";
import RecipeCard from "../../../components/ui/recipeCard/RecipeCard";
import type { RecipeBase } from "../../../components/ui/recipeCard/data/recipeCardType";

const MyRecipes = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useAuth();
  const [favoriteList, setFavoriteList] = useState<RecipeBase[]>();
  const [isLoadingFav, setIsLoadingFav] = useState<boolean>();

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
        console.log("Erreur de chargement des recettes favorites : ", err);
      } finally {
        setIsLoadingFav(false);
      }
    };

    fetchFavorites();
  }, [user]);

  return (
    <section className="my-recipes">
      <article>
        <h2>Mes recettes favorites</h2>
        {user ? (
          isLoadingFav ? (
            <span>Chargement des favoris</span>
          ) : (
            favoriteList?.map((recipe) => (
              <RecipeCard key={recipe.id} variant="rect" recipe={recipe} />
            ))
          )
        ) : (
          <span>
            Veuillez vous connecter pour visualiser vos recettes favorites
          </span>
        )}
      </article>
      <article>
        <h2>Mes recettes ajoutées</h2>
        {user ? (
          <></>
        ) : (
          <span>
            Veuillez vous connecter pour visualiser vos recettes ajoutées
          </span>
        )}
      </article>
      <NewRecipes />
    </section>
  );
};

export default MyRecipes;
