import express from "express";
import authActions from "./modules/auth/authActions";
import ingredientsActions from "./modules/ingredients/ingredientsActions";
import recipesActions from "./modules/recipes/recipesActions";
import auth from "./utils/auth";
import validation from "./utils/validation";
import files from "./utils/files";
import unitActions from "./modules/unit/unitActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes

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

router.get("/api/recipes", recipesActions.browseSearchRecipes);
router.get("/api/last-recipes", recipesActions.browseLastRecipes);
router.post(
  "/api/newRecipes",
  // files.imageUpload,
  // files.recipesImage,
  recipesActions.addRecipes,
);

router.get("/api/ingredients", ingredientsActions.browseIngredient);

router.get("/api/unit", unitActions.browseUnit);
/* ************************************************************************* */

export default router;
