import "./MyRecipes.css";
import NewRecipes from "../../../components/newRecipes/NewRecipes";

const MyRecipes = () => {
  return (
    <section className="my-recipes">
      <article>
        <h2>Mes recettes favorites</h2>
      </article>
      <article>
        <h2>Mes recettes ajoutées</h2>
      </article>
      <NewRecipes />
    </section>
  );
};

export default MyRecipes;
