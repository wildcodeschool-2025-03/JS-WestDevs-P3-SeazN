import { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router";
import type { RecipeBase } from "../../../src/components/ui/recipeCard/data/recipeCardType";
import RecipeCard from "../../components/ui/recipeCard/RecipeCard";

const Home = () => {
  const [lastRecipes, setLastRecipes] = useState<RecipeBase[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/last-recipes")
      .then((res) => res.json())
      .then((data) => setLastRecipes(data));
  }, []);
  return (
    <section className="home-section">
      <hgroup>
        <h1>
          <img
            src="/icones-logo/logo SeazN.webp"
            alt="Logo SeazN"
            className="logo-full"
          />
        </h1>
        <p>
          Le plaisir de cuisiner, la clé d’une alimentation saine et
          transparente !
        </p>
      </hgroup>
      <article className="last-recipes">
        <h2>Dernières recettes postées</h2>
        <div className="mini-cards">
          {lastRecipes.map((recipe) => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
              <RecipeCard variant="mini" recipe={recipe} />
            </Link>
          ))}
        </div>
      </article>
      <img
        src="/icones-logo/feuille footer 2 v2.webp"
        alt="decoration Logo leaf above footer"
        className="leaf-logo-footer"
      />
    </section>
  );
};

export default Home;
