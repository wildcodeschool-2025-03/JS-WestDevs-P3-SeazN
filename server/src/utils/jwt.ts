import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret-key";

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret) as {
      username: string;
      email: string;
      firstName: string;
    };
  } catch (error) {
    console.error("Token invalide :", error);
    return null;
  }
};
