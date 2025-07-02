import type { User } from "./types";

import databaseClient, {
  type Rows,
  type Result,
} from "../../../database/client";

class AuthRepository {
  // login
  async readByEmail(email: string) {
    const [user] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );
    return user[0];
  }

  // SignUp
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
