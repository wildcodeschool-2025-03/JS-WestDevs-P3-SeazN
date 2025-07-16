import { useEffect, useState } from "react";
import { Link } from "react-router";
import RecipeCard from "../../components/ui/recipeCard/RecipeCard";
import type { RecipeBase } from "../../components/ui/recipeCard/data/recipeCardType";
import "./Recipes.css";
import { formFilters } from "./data/recipesData";
import type { FormObjType } from "./data/recipesType";

const Recipes = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formObj, setFormObj] = useState<FormObjType>({});
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeBase[] | null>(
    null,
  );
  const [page, setPage] = useState<number>(1);
  const [totalRecipes, setTotalRecipes] = useState<number>(0);
  const limitResults = 20;
  const totalPages = Math.ceil(totalRecipes / limitResults);

  useEffect(() => {
    const params = new URLSearchParams();
    const queryTimer = setTimeout(() => {
      for (const [key, value] of Object.entries(formObj)) {
        switch (key) {
          case "name":
            if (value.length > 3) {
              params.append(key, value);
            }
            break;
          case "price":
          case "duration":
          case "usersRanking":
          case "ecoRanking":
            params.append(key, value);
            break;
          default:
            break;
        }
      }
      params.append("page", page.toString());
      fetch(`${apiUrl}/api/recipes?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          setFilteredRecipes(data.recipes);
          setTotalRecipes(data.totalRecipes);
        });
    }, 1500);
    return () => clearTimeout(queryTimer);
  }, [formObj, page]);

  return (
    <section className="recipe-search">
      <form
        onChange={(e) => {
          const formData = new FormData(e.currentTarget);
          const obj = {
            name: "",
            price: "",
            duration: "",
            usersRanking: "",
            ecoRanking: "",
          };

          for (const [key] of formData) {
            const values = formData.getAll(key);
            const value = values.length === 1 ? values[0] : values;
            switch (key) {
              case "name":
              case "usersRanking":
              case "ecoRanking":
                obj[key] = typeof value === "string" ? value : "";
                break;
              case "price":
              case "duration":
                if (Array.isArray(value)) {
                  obj[key] = value
                    .map((item) => (typeof item === "string" ? item : ""))
                    .join(",");
                } else {
                  obj[key] = typeof value === "string" ? value : "";
                }
                break;
              default:
                break;
            }
            setFormObj(obj);
          }
        }}
      >
        <details aria-labelledby="recherche-nom">
          <summary id="recherche-nom">Recherche par nom</summary>
          <label htmlFor="name">
            <input
              id="name"
              type="text"
              name="name"
              aria-label="name"
              maxLength={50}
              placeholder="Entrez un nom de recette"
            />
          </label>
        </details>
        {formFilters.map((filter) => {
          return (
            <details key={filter.id} aria-labelledby={filter.filterName}>
              <summary id={filter.filterName}>{filter.filterName}</summary>
              <div>
                {filter.content.map((item) => {
                  return (
                    <label key={item.id} htmlFor={item.id}>
                      <input
                        type={filter.type}
                        id={item.id}
                        name={filter.id}
                        value={item.value}
                      />
                      <span>
                        {item.name} {filter.typeDetail === "ranking" && "☆"}
                      </span>
                    </label>
                  );
                })}
              </div>
            </details>
          );
        })}
      </form>

      {/* Visualisation  */}
      <span>
        {totalRecipes === 0
          ? "Aucune recette ne correspond à votre recherche"
          : totalRecipes > 1
            ? `${totalRecipes} recettes correspondent à votre recherche`
            : "1 recette correspond à votre recherche"}
      </span>
      <div>
        {filteredRecipes?.map((recipe) => {
          return (
            <Link key={recipe.id} to={`/recipes/:${recipe.id}`}>
              <RecipeCard variant="square" recipe={recipe} />
            </Link>
          );
        })}
      </div>

      <div>
        <button
          type="button"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          &laquo; Précédent
        </button>

        <span>
          {page} / {totalPages}
        </span>

        <button
          type="button"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Suivant &raquo;
        </button>
      </div>
    </section>
  );
};

export default Recipes;
