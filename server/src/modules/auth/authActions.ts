import type { RequestHandler } from "express";
import authRepository from "./authRepository";

// login
const browse: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await authRepository.readByEmail(email);

    if (user) {
      res.status(200).json("Congratulations, you're connected !");
    } else {
      res.status(404).json("An error has occurred!");
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

// SignUp
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
    res.sendStatus(500);
  }
};

export default { add, browse };
