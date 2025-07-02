import "./Recipes.css"

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
          <label htmlFor="">

          </label>
        </fieldset>

        <label htmlFor="name">
          <input id="name" type="text" name="name"
            aria-label="name" placeholder="Recherche par nom" />
        </label>

      </form>
      <div>
        Visualisation :
      </div>
    </section>
  );
};

export default Recipes;
