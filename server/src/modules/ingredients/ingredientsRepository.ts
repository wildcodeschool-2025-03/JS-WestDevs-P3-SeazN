import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class ingredientRepository {
  async readAllIngredient() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM ingredient");
    return rows;
  }
}

export default new ingredientRepository();
