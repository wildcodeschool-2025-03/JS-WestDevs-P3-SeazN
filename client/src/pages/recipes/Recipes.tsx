import "./Recipes.css"
import { formOptions } from "./data/recipesData";

const Recipes = () => {
  return (
    <section className="recipe-search">
      <form action="">
        Form :
        <fieldset>
          <legend>Recherche par nom</legend>
          <label htmlFor="name">
            <input id="name" type="text" name="name"
              aria-label="name" placeholder="Recherche par nom" />
          </label>
        </fieldset>

        <fieldset>
          <legend>Durée</legend>
          <div >
            {formOptions.duration.map((item) => {
              return (
                <label key={item.id} htmlFor={item.value} >
                  <input type="checkbox" id={item.value} />
                  <span > {item.label} </span>
                </label>
              )
            })}
          </div>
        </fieldset>
        <fieldset>
          <legend>Prix</legend>
          <div >
            {formOptions.price.map((item) => {
              return (
                <label key={item.id} htmlFor={item.value} >
                  <input type="checkbox" id={item.value} />
                  <span > {item.label} </span>
                </label>
              )
            })}
          </div>
        </fieldset>
      </form>

      <div>
        Visualisation :
      </div>
    </section>
  );
};

export default Recipes;
