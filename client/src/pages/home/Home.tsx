import "./home.css";
import { Link } from "react-router";
import type { RecipeBase } from "../../../src/components/ui/recipeCard/data/recipeCardType";
import RecipeCard from "../../components/ui/recipeCard/RecipeCard";

const lastRecipes: RecipeBase[] = [
  {
    id: 1,
    name: "Riz au curry",
    image:
      "https://img.cuisineaz.com/660x495/2015/10/22/i100924-riz-champignons.webp",
  },
  {
    id: 2,
    name: "Biscuits cacao",
    image:
      "https://resize.elle.fr/portrait_320_webp/var/plain_site/storage/images/elle-a-table/recettes-de-cuisine/biscuits-sans-farine-au-cacao-parfume-3593609/85388120-1-fre-FR/Biscuits-sans-farine-au-cacao-parfume.jpg",
  },
  {
    id: 3,
    name: "Blanquette de veau",
    image: "https://assets.afcdn.com/recipe/20190529/93191_w600.jpg",
  },
];

const Home = () => {
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
