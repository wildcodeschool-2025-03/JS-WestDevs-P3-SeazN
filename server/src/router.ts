import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import authActions from "./modules/auth/authActions";
import recipesActions from "./modules/recipes/recipesActions";
import auth from "./utils/auth";
import validation from "./utils/validation";

router.post(
  "/api/login",
  validation.authValidation,
  auth.login,
  authActions.browse,
);
router.post(
  "/api/signup",
  validation.authValidation,
  auth.hashPassword,
  authActions.add,
  auth.login,
  authActions.browse,
);
router.get("/api/refresh", auth.refreshToken);

router.get("/api/last-recipes", recipesActions.browseLastRecipes);
router.get("/api/recipes", recipesActions.browseSearchRecipes);

/* ************************************************************************* */

export default router;
