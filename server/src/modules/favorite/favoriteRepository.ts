import databaseClient, {
  type Result,
  type Rows,
} from "../../../database/client";

class FavoriteRepository {
  async readAll(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT 
        r.id as id, r.name, r.image
      FROM recipe as r
      LEFT JOIN save as s ON id = s.recipe_id
      WHERE s.user_id = ? AND s.is_favorite = ?
      `,
      [userId, true],
    );

    return rows;
  }

  async readSingleFavorite(userId: number, recipeId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT is_favorite
      FROM save
      WHERE user_id = ? AND recipe_id = ?
      `,
      [userId, recipeId],
    );

    return rows;
  }

  async createFavorite(userId: number, recipeId: number) {
    const [result] = await databaseClient.query<Result>(
      `
      INSERT INTO save (user_id, recipe_id, is_favorite)
      VALUES (?,?,?)
      ON DUPLICATE KEY UPDATE is_favorite = ?
      `,
      [userId, recipeId, true, true],
    );

    return result.affectedRows;
  }

  async updateFavorite(userId: number, recipeId: number) {
    const [result] = await databaseClient.query<Result>(
      `
      UPDATE save
      SET is_favorite = ?
      WHERE user_id = ? AND recipe_id = ?
      `,
      [false, userId, recipeId],
    );

    return result.affectedRows;
  }
}

export default new FavoriteRepository();
