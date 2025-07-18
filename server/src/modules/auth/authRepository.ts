import databaseClient, {
  type Result,
  type Rows,
} from "../../../database/client";
import type { User } from "./types";

class AuthRepository {
  async readById(userId: number): Promise<User | null> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT email, username, password, is_major, last_active, is_premium, is_admin, country FROM user WHERE id = ?",
      [userId],
    );

    return (rows[0] as User) ?? null;
  }

  async readByEmail(email: string) {
    const [user] = await databaseClient.query<Rows>(
      "SELECT id, email, username, password FROM user WHERE email = ?",
      [email],
    );
    return user[0];
  }

  async create(body: User): Promise<number> {
    try {
      const [result] = await databaseClient.query<Result>(
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
      return result.insertId;
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as { code: string }).code === "ER_DUP_ENTRY"
      ) {
        throw new Error("Ce nom d'utilisateur ou cet email est déjà utilisé.");
      }

      throw err;
    }
  }
}

export default new AuthRepository();
