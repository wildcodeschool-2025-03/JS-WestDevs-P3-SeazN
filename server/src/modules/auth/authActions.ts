import type { RequestHandler } from "express";
import { verifyToken } from "../../utils/jwt";
import authRepository from "./authRepository";
import type { User } from "./types";

const browse: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await authRepository.readByEmail(email);

    if (user) {
      res.status(200).json({
        email: user.email,
        username: user.username,
      });
    } else {
      res.status(404).json({ message: "Utilisateur introuvable." });
    }
  } catch (err) {
    console.error("Erreur dans browse:", err);
    res.status(500).json({ message: "Une erreur interne s’est produite." });
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const userId: number = await authRepository.create(req.body);
    const user: User | null = await authRepository.readById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Erreur lors de la création du compte." });
    }

    if (!req.body._originalPassword) {
      return res
        .status(400)
        .json({ message: "Mot de passe original manquant." });
    }

    req.body.email = user.email;
    req.body.password = req.body._originalPassword;

    next(); // passe à auth.login
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "message" in err &&
      typeof (err as { message: string }).message === "string"
    ) {
      const errorMessage = (err as { message: string }).message;
      return res.status(409).json({ message: errorMessage });
    }

    console.error("Erreur dans add:", err);
    res.status(500).json({ message: "Une erreur interne s’est produite." });
  }
};

const refresh: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Aucun token fourni." });
    }

    const decoded = verifyToken(token);

    if (!decoded || !decoded.email || !decoded.username) {
      return res.status(403).json({ message: "Token invalide ou incomplet." });
    }

    res.status(200).json({
      email: decoded.email,
      username: decoded.username,
    });
  } catch (error) {
    console.error("Erreur refresh:", error);
    res.status(500).json({ message: "Erreur interne lors du refresh." });
  }
};

export default { add, browse, refresh };
