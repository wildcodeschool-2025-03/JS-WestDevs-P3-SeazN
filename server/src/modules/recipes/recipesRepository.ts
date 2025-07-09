import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

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
}

export default new recipesRepository();
