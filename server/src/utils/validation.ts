import type { RequestHandler } from "express";

const authValidation: RequestHandler = (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isEmailValid = email.match(
      /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/,
    );

    if (!email || !password) {
      res.status(403).json("Les champs ne doivent pas êtres vides");
    } else if (!isEmailValid) {
      res.status(403).json("Le format de l'email est invalide");
    } else if (password.length < 8) {
      res
        .status(403)
        .json(
          "La longueur du mot de passe doit contenir au moins 8 caractères",
        );
    } else {
      next();
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

export default { authValidation };
