import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { AddRecipes } from "../../types/recipes";

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
    const sqlBaseFrom: string =
      "FROM recipe LEFT JOIN rating ON recipe.id = rating.recipe_id ";
    const sqlBaseGroupBy: string = " GROUP BY recipe.id";
    const whereFilters: string[] = ["(recipe.is_validated = ?)"];
    const havingFilters: string[] = [];
    const sqlParams: (string | number)[] = [1];

    /* Filter by name */
    if (recipesParams.name && recipesParams.name.length > 0) {
      whereFilters.push("(recipe.name LIKE ?)");
      sqlParams.push(`%${recipesParams.name}%`);
    }

    /* Filter by price */
    if (recipesParams.price && recipesParams.price.length > 0) {
      const prices = recipesParams.price
        .split(",")
        .map((price) => Number.parseInt(price));

      whereFilters.push(
        `(recipe.price IN (${prices.map((price) => "?").join(", ")}))`,
      );

      for (const price of prices) {
        sqlParams.push(price);
      }
    }

    /* Filter by duration */
    if (recipesParams.duration && recipesParams.duration.length > 0) {
      const ranges = recipesParams.duration
        .split(",")
        .map((range) => range.split("-"));

      const whereRanges = [];
      for (const range of ranges) {
        whereRanges.push("(recipe.duration BETWEEN ? AND ?)");
        sqlParams.push(range[0], range[1]);
      }
      whereFilters.push(`(${whereRanges.join(" OR ")})`);
    }

    /* Filter by eco evaluation */
    if (recipesParams.ecoRanking && recipesParams.ecoRanking.length > 0) {
      whereFilters.push("(recipe.eco_average >= ?)");
      sqlParams.push(Number.parseInt(recipesParams.ecoRanking));
    }

    /* Filter by users evaluation */
    if (recipesParams.usersRanking && recipesParams.usersRanking.length > 0) {
      havingFilters.push("(AVG(rating.mark) >= ?)");
      sqlParams.push(Number.parseInt(recipesParams.usersRanking));
    }

    /* Total recipes request */
    const countSql = `SELECT COUNT(*) as totalRecipes FROM (
    SELECT recipe.id
    ${sqlBaseFrom}
    WHERE ${whereFilters.join(" AND ")}
    ${sqlBaseGroupBy}
    ${havingFilters.length > 0 ? `HAVING ${havingFilters.join(" AND ")}` : ""}
  ) as filtered_recipes`;

    /* Displayed recipes request */
    let dataSql = `SELECT recipe.id, recipe.name, recipe.image
    ${sqlBaseFrom} 
    WHERE ${whereFilters.join(" AND ")} 
    ${sqlBaseGroupBy} `;

    if (havingFilters.length > 0) {
      dataSql += ` HAVING ${havingFilters.join(" AND ")}`;
    }

    if (recipesParams.page && recipesParams.page.length > 0) {
      const limitResults = 20;
      const offsetResults =
        limitResults * (Number.parseInt(recipesParams.page) - 1);
      dataSql += " LIMIT ? OFFSET ?";
      sqlParams.push(limitResults, offsetResults);
    }

    /* Execute requests : Count and Data  */
    const [countRows] = await databaseClient.query<Rows>(countSql, sqlParams);
    const totalRecipes = countRows[0].totalRecipes;

    const [dataRows] = await databaseClient.query<Rows>(dataSql, sqlParams);

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

  async createRecipes(body: AddRecipes) {
    console.warn("JE SUIS DANS REPOSITORY");
    const [result] = await databaseClient.query<Result>(
      // "INSERT INTO recipe (name, image, price, is_validated, guest_number, nutrition_average, eco_average, duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      // [
      //   body.name,
      //   body.image,
      //   body.price,
      //   body.is_validated,
      //   body.guest_number,
      //   body.nutrition_average,
      //   body.eco_average,
      //   body.duration,
      // ],
      `START TRANSACTION;
       INSERT INTO recipe (name, image, price, is_validated, guest_number, duration, nutrition_average, eco_average, user_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       SET @recipe_id = LAST_INSERT_ID();
       INSERT INTO quantity (ingredient_id, recipe_id, quantity, unit_id)
       VALUES (?, @recipe_id, ?, ?);
       INSERT INTO instruction (step_order, content, recipe_id)
       VALUES (?, ?, @recipe_id);
       COMMIT;`,
      [
        body.name,
        body.image,
        body.price,
        body.is_validated,
        body.guest_number,
        body.duration,
        body.nutrition_average,
        body.eco_average,
        body.user_id,
        body.ingredient_id,
        body.recipe_id,
        body.quantity,
        body.unit_id,
        body.step_order,
        body.content,
      ],
    );
    console.warn("JE SUIS APRES LA REQUETE SQL");

    return result.affectedRows;
  }
}

export default new RecipesRepository();
