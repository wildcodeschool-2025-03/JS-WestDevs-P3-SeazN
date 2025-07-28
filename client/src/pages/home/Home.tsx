import { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router";
import type { RecipeBase } from "../../../src/components/ui/recipeCard/data/recipeCardType";
import RecipeCard from "../../components/ui/recipeCard/RecipeCard";

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [lastRecipes, setLastRecipes] = useState<RecipeBase[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/last-recipes`)
      .then((res) => res.json())
      .then((data) => setLastRecipes(data));
  }, []);
  return (
    <section className="home-section">
      <hgroup>
        <h1>
          <img src="/icones-logo/logo SeazN.webp" alt="Logo SeazN" />
        </h1>
        <p>
          Le plaisir de cuisiner,
          <br /> la clé d'une alimentation saine et transparente !
        </p>
      </hgroup>
      <article>
        <h2>Dernières recettes postées</h2>
        <div>
          {lastRecipes.map((recipe) => (
            <div key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`}>
                <RecipeCard variant="mini" recipe={recipe} />
              </Link>
              <span role="tooltip">{recipe.name}</span>
            </div>
          ))}
        </div>
      </article>
      <img
        src="/icones-logo/feuille footer 2 v2.webp"
        alt="decoration Logo leaf above footer"
      />
    </section>
  );
};

export default Home;
