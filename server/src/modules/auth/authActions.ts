import type { RequestHandler } from "express";
import { verifyToken } from "../../utils/jwt";
import authRepository from "./authRepository";

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
      res.status(404).json("An error has occurred!");
    }
  } catch (err) {
    res.status(500).json({ message: "Une erreur interne s’est produite." });
  }
};

const add: RequestHandler = async (req, res) => {
  try {
    const user = await authRepository.create(req.body);

    if (user) {
      res
        .status(201)
        .json("Congratulations, your account has been created successfully !");
    } else {
      res.status(404).json("An error occured during the registration");
    }
  } catch (err) {
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
