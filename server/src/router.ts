import express from "express";
import authActions from "./modules/auth/authActions";
import ingredientsActions from "./modules/ingredients/ingredientsActions";
import recipesActions from "./modules/recipes/recipesActions";
import auth from "./utils/auth";
import validation from "./utils/validation";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
// Define item-related routes

router.get("/api/last-recipes", recipesActions.browseLastRecipes);

router.post("/api/login", authActions.browse);
router.post(
  "/api/signup",
  validation.authValidation,
  auth.hashPassword,
  authActions.add,
);

router.get("/api/ingredients", ingredientsActions.browseIngredient);
router.post("/api/newRecipes", recipesActions.addRecipes)

/* ************************************************************************* */

export default router;
