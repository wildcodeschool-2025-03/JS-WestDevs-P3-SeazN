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
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [recipeResult] = await connection.query<Result>(
        `INSERT INTO recipe (name, image, guest_number, duration, user_id, price, is_validated, nutrition_average, eco_average)
       VALUES (?, ?, ?, ?, ?, ?, TRUE, ?, ?)`,
        [
          body.name,
          body.image || null,
          body.guest_number,
          body.duration,
          body.user_id || null,
          body.price || null,
          body.nutrition_average || null,
          body.eco_average || null,
        ],
      );

      const recipeId = recipeResult.insertId;

      if (body.ingredients && body.ingredients.length > 0) {
        const ingredientValues = body.ingredients.map((ing) => [
          ing.ingredient_id,
          recipeId,
          ing.quantity || null,
          ing.unit_id || null,
        ]);

        await connection.query(
          "INSERT INTO quantity (ingredient_id, recipe_id, quantity, unit_id) VALUES ?",
          [ingredientValues],
        );
      }

      if (body.instructions && body.instructions.length > 0) {
        const instructionValues = body.instructions.map((inst) => [
          inst.step_order,
          inst.content,
          recipeId,
        ]);

        await connection.query(
          "INSERT INTO instruction (step_order, content, recipe_id) VALUES ?",
          [instructionValues],
        );
      }

      await connection.commit();

      return recipeResult.affectedRows;
    } catch (error) {
      await connection.rollback();
      console.error("Erreur lors de la création de la recette:", error);
      throw new Error("Erreur lors de la création de la recette");
    } finally {
      connection.release();
    }
  }
}

export default new RecipesRepository();
