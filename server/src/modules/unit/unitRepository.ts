import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class unitRepository {
  async readAllUnit() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM unit");
    return rows;
  }
}

export default new unitRepository();
