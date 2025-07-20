import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import authRepository from "../modules/auth/authRepository";

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;

    req.body._originalPassword = password;

    const hash = await argon2.hash(password, {
      memoryCost: 2 ** 19,
      timeCost: 2,
      parallelism: 1,
    });

    req.body.password = hash;

    next();
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).json({ message: "Une erreur interne s’est produite." });
  }
};
const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authRepository.readByEmail(email);

    if (!user) {
      throw new Error("this user doesn't exist");
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    const secretKey = process.env.APP_SECRET;

    if (!secretKey) {
      throw new Error("A secret must be provided");
    }
    const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ message: "Une erreur interne s’est produite." });
  }
};

const refreshToken: RequestHandler = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new Error("A secret must be provided");
    }

    const secretKey = process.env.APP_SECRET;
    if (!secretKey) {
      throw new Error("A secret must be provided");
    }

    const verifyToken = jwt.verify(token, secretKey);

    if (verifyToken) {
      const { id, email, firstName, username } = verifyToken as JwtPayload;

      const newToken = jwt.sign({ id, email, firstName, username }, secretKey, {
        expiresIn: "1d",
      });

      res.cookie("token", newToken, {
        httpOnly: true,
        secure: false,
      });
      res.status(200).json({ id, email, firstName, username });
    }
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).json({ message: "Erreur lors du refresh du token." });
  }
};

export default { hashPassword, login, refreshToken };
