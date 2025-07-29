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

  async readById(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        r.id,
        r.name,
        r.image,
        r.price,
        r.guest_number,
        r.nutrition_average,
        r.eco_average,
        r.duration,
       
         (
            SELECT AVG(rating.mark) 
            FROM rating 
            WHERE rating.recipe_id = r.id
          ) as user_ratings,
      
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', i.id,
                'name', i.name,
                'quantity', q.quantity,
                'unit', u.name,
                'is_vegan', i.is_vegan,
                'is_vegetarian', i.is_vegetarian,
                'is_glutenfree', i.is_glutenfree,
                'nutrition_score', i.nutrition_score
            )
        ) AS ingredients,
        
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'step_order', sub.step_order,
                    'content', sub.content
                )
            )
            FROM (
                SELECT inst.step_order, inst.content
                FROM instruction inst
                WHERE inst.recipe_id = r.id
                ORDER BY inst.step_order
            ) AS sub
        ) AS instructions
      
      FROM recipe r
      LEFT JOIN quantity q ON r.id = q.recipe_id
      LEFT JOIN ingredient i ON q.ingredient_id = i.id
      LEFT JOIN unit u ON q.unit_id = u.id
      
      WHERE r.id = ?
      GROUP BY r.id
      `,
      [id],
    );
    return rows[0] || null;
  }

  async createRecipes(body: AddRecipes) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [recipeResult] = await connection.query<Result>(
        `INSERT INTO recipe (name, image, guest_number, duration, user_id, price, is_validated, nutrition_average, eco_average)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          body.name,
          body.image || null,
          body.guest_number,
          body.duration,
          body.user_id || null,
          body.price || null,
          true,
          body.nutrition_average || null,
          body.eco_average || null,
        ],
      );

      const recipeId = recipeResult.insertId;

      const ingredients = JSON.parse(String(body.ingredients));
      if (ingredients && ingredients.length > 0) {
        const ingredientValues = ingredients.map(
          (ing: { id: string; quantity: number; unit: number }) => [
            String(ing.id),
            recipeId,
            ing.quantity || null,
            ing.unit || null,
          ],
        );
        await connection.query(
          "INSERT INTO quantity (ingredient_id, recipe_id, quantity, unit_id) VALUES ?",
          [ingredientValues],
        );
      }

      const instructions = JSON.parse(String(body.instructions));
      if (instructions && instructions.length > 0) {
        const instructionValues = instructions.map(
          (inst: { step_order: number; content: string }) => [
            inst.step_order,
            inst.content,
            recipeId,
          ],
        );

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
