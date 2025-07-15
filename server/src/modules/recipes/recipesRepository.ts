import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { Recipes } from "../../types/recipes";

type Recipe = {
  id: number;
  name: string;
  image: string;
  is_validated: boolean;
};

class recipesRepository {
  async readLastRecipes() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM recipe WHERE is_validated = 1 ORDER BY id DESC LIMIT 5",
    );
    return rows;
  }

  async createRecipes(body: Recipes) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO recipe (name, image, price, is_validated, guest_number, nutrition_average, eco_average, duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        body.name,
        body.image,
        body.price,
        body.is_validated,
        body.guest_number,
        body.nutrition_average,
        body.eco_average,
        body.duration,
      ],
    );
    return result;
  }
}

export default new recipesRepository();
