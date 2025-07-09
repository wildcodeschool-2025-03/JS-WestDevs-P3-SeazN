import databaseClient, { type Rows } from "../../../database/client";

interface RecipeBase {
  id: number;
  name: string;
  image: string;
}

export interface RecipesParams {
  name?: string;
  price?: string;
  duration?: string;
  usersRanking?: string;
  ecoRanking?: string;
}

class RecipesRepository {
  async readSearchRecipes(recipesParams: RecipesParams) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from recipe WHERE price = ?",
      recipesParams.price,
    );

    console.log("rows :", rows);

    return rows as RecipeBase[];
  }
}

export default new RecipesRepository();
