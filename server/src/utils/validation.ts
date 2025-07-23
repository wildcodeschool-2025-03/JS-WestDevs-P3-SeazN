import type { RequestHandler } from "express";

const authValidation: RequestHandler = (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isEmailValid = email.match(
      /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/,
    );

    const isPasswordValid = password.match(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
    );

    if (!email || !password) {
      res.status(403).json("Les champs ne doivent pas êtres vides");
    } else if (!isEmailValid) {
      res.status(403).json("Le format de l'email est invalide");
    } else if (!isPasswordValid) {
      res
        .status(403)
        .json(
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
        );
    } else {
      next();
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

export default { authValidation };
