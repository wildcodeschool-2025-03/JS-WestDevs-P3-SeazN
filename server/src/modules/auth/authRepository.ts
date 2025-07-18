import type { User } from "./types";

import databaseClient, {
  type Result,
  type Rows,
} from "../../../database/client";

class AuthRepository {
  async readByEmail(email: string) {
    const [user] = await databaseClient.query<Rows>(
      "SELECT id, email, username, password FROM user WHERE email = ?",
      [email],
    );
    return user[0];
  }

  async create(body: User) {
    const [user] = await databaseClient.query<Result>(
      "INSERT INTO user (username, email, password, is_premium, is_admin, country, last_active, is_major ) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)",
      [
        body.username,
        body.email,
        body.password,
        body.is_premium,
        body.is_admin,
        body.country,
        body.is_major,
      ],
    );
    return user.affectedRows;
  }
}

export default new AuthRepository();
