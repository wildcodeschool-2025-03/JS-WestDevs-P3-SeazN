import databaseClient, { type Rows } from "../../../database/client";

interface RecipeBase {
  id: number;
  name: string;
  image: string;
}

export type AvailableFilters =
  | "name"
  | "price"
  | "duration"
  | "usersRanking"
  | "ecoRanking";

export interface RecipesParams {
  name?: string;
  price?: string;
  duration?: string;
  usersRanking?: string;
  ecoRanking?: string;
}

class RecipesRepository {
  async readSearchRecipes(recipesParams: RecipesParams) {
    let sql = "SELECT id,name,image from recipe";
    /* AJOUTER is_validated ! */
    const sqlWhere = [];
    const sqlParams: (string | number)[] = [];

    if (recipesParams.name && recipesParams.name.length > 0) {
      sqlWhere.push("recipe.name LIKE ?");
      sqlParams.push(`%${recipesParams.name}%`);
    }

    if (recipesParams.price && recipesParams.price.length > 0) {
      const prices = recipesParams.price
        .split(",")
        .map((price) => Number.parseInt(price));

      sqlWhere.push(
        `recipe.price IN (${prices.map((price) => "?").join(", ")})`,
      );

      for (const price of prices) {
        sqlParams.push(price);
      }
    }

    /* Change TIME to INT in table */
    /*  if (recipesParams.duration && recipesParams.duration.length > 0) {
      sqlWhere.push("recipe.duration IN ?");
      sqlParams.push(
        recipesParams.duration
          .split(",")
          .map((value) => Number.parseInt(value)),
      ); 
    }  */

    /* JOIN here
    if (recipesParams.usersRanking && recipesParams.usersRanking.length > 0) {
      sqlWhere.push("recipe.usersRanking >= ?");
      sqlParams.push(Number.parseInt(recipesParams.usersRanking));
    } */

    if (recipesParams.ecoRanking && recipesParams.ecoRanking.length > 0) {
      sqlWhere.push("recipe.eco_average >= ?");
      sqlParams.push(Number.parseInt(recipesParams.ecoRanking));
    }

    if (sqlWhere.length > 0) {
      sql += ` WHERE ${sqlWhere.join(" AND ")}`;
    }

    console.warn("SQL Where : ", sqlWhere);
    console.warn("SQL request : ", sql);
    console.warn("SQL values : ", sqlParams);

    const [rows] = await databaseClient.query<Rows>(sql, sqlParams);

    console.warn("rows :", rows);

    return rows as RecipeBase[];
  }
}

export default new RecipesRepository();
