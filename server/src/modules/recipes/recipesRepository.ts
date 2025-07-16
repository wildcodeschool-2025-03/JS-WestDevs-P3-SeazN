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
  | "ecoRanking"
  | "page";

export interface RecipesParams {
  name?: string;
  price?: string;
  duration?: string;
  usersRanking?: string;
  ecoRanking?: string;
  page?: string;
}

class RecipesRepository {
  async readSearchRecipes(recipesParams: RecipesParams) {
    let sqlBase = "FROM recipe ";
    const sqlWhere = ["(recipe.is_validated = ?)"];
    const sqlParams: (string | number)[] = [1];

    if (recipesParams.name && recipesParams.name.length > 0) {
      sqlWhere.push("(recipe.name LIKE ?)");
      sqlParams.push(`%${recipesParams.name}%`);
    }

    if (recipesParams.price && recipesParams.price.length > 0) {
      const prices = recipesParams.price
        .split(",")
        .map((price) => Number.parseInt(price));

      sqlWhere.push(
        `(recipe.price IN (${prices.map((price) => "?").join(", ")}))`,
      );

      for (const price of prices) {
        sqlParams.push(price);
      }
    }

    if (recipesParams.duration && recipesParams.duration.length > 0) {
      const ranges = recipesParams.duration
        .split(",")
        .map((range) => range.split("-"));
      const whereRanges = [];
      for (const range of ranges) {
        whereRanges.push("(recipe.duration BETWEEN ? AND ?)");
        sqlParams.push(range[0], range[1]);
      }
      sqlWhere.push(`(${whereRanges.join(" OR ")})`);
    }

    /* No users ranking in DB - Add it later
    if (recipesParams.usersRanking && recipesParams.usersRanking.length > 0) {
      sqlWhere.push("recipe.usersRanking >= ?");
      sqlParams.push(Number.parseInt(recipesParams.usersRanking));
    } */

    if (recipesParams.ecoRanking && recipesParams.ecoRanking.length > 0) {
      sqlWhere.push("(recipe.eco_average >= ?)");
      sqlParams.push(Number.parseInt(recipesParams.ecoRanking));
    }

    if (sqlWhere.length > 0) {
      sqlBase += ` WHERE ${sqlWhere.join(" AND ")}`;
    }

    /* Total recipes */
    const countSql = `SELECT count(*) as totalRecipes ${sqlBase}`;
    const countParams = sqlParams;
    const [countRows] = await databaseClient.query<Rows>(countSql, countParams);
    const totalRecipes = countRows[0].totalRecipes;

    /* Displayed recipes */
    let dataSql = `SELECT id, name, image ${sqlBase}`;
    const dataParams = sqlParams;
    if (recipesParams.page && recipesParams.page.length > 0) {
      const limitResults = 20;
      const offsetResults =
        limitResults * (Number.parseInt(recipesParams.page) - 1);
      dataSql += " LIMIT ? OFFSET ?";
      sqlParams.push(limitResults, offsetResults);
    }

    const [dataRows] = await databaseClient.query<Rows>(dataSql, dataParams);

    return {
      recipes: dataRows as RecipeBase[],
      totalRecipes: totalRecipes as number,
    };
  }

  async readLastRecipes() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM recipe WHERE is_validated = 1 ORDER BY id DESC LIMIT 5",
    );
    return rows;
  }
}

export default new RecipesRepository();
