import "./Recipes.css";
import { formFilters } from "./data/recipesData";

const Recipes = () => {
  /* useEffect(() => {
    const formObj = Object.fromEntries(formData)
    console.log(formObj);
  }, [formData]); */

  return (
    <section className="recipe-search">
      <form
        /* action="" */
        onChange={(e) => {
          const formData = new FormData(e.currentTarget);
          const formObj = Object.fromEntries(formData);
          console.log(formObj);
        }}
      >
        Form :
        <fieldset>
          <legend>Recherche par nom</legend>
          <label htmlFor="name">
            <input
              id="name"
              type="text"
              name="name"
              aria-label="name"
              placeholder="Recherche par nom"
            />
          </label>
        </fieldset>
        {formFilters.map((filter) => {
          return (
            <fieldset key={filter.id}>
              <legend>{filter.filterName}</legend>
              <div>
                {filter.content.map((item, index) => {
                  return (
                    <label key={item.id} htmlFor={item.id}>
                      <input
                        type={filter.type}
                        id={item.id}
                        name={filter.id}
                        value={item.value}
                        defaultChecked={
                          filter.type === "radio" ? index === 0 : undefined
                        }
                      />
                      <span>
                        {item.name} {filter.typeDetail === "ranking" && "☆"}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </form>

      <div>Visualisation :</div>
    </section>
  );
};

export default Recipes;
