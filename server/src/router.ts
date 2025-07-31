import express from "express";
import files from "./utils/files";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import authActions from "./modules/auth/authActions";
import favoriteActions from "./modules/favorite/favoriteActions";
import ingredientsActions from "./modules/ingredients/ingredientsActions";
import recipesActions from "./modules/recipes/recipesActions";
import unitActions from "./modules/unit/unitActions";
import auth from "./utils/auth";
import validateRecipeForm from "./utils/checkForm";
import validation from "./utils/validation";

/* Login */

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

/* Recipes */

router.get("/api/last-recipes", recipesActions.browseLastRecipes);
router.get("/api/recipes", recipesActions.browseSearchRecipes);
router.get("/api/recipes/:id", recipesActions.readRecipeDetailed);
router.get(
  "/api/user/:userId/my-recipes/",
  recipesActions.browseAddedRecipesByUser,
);

/* Recipes Creation*/

router.get("/api/ingredients", ingredientsActions.browseIngredient);
router.get("/api/unit", unitActions.browseUnit);
router.post(
  "/api/user/:userId/newRecipes",
  files.imageUpload,
  files.recipesImage,
  validateRecipeForm,
  recipesActions.addRecipes,
);

/* Favorite Recipes */

router.post(
  "/api/user/:userId/favorites/:recipeId/",
  favoriteActions.addFavorite,
);

router.get(
  "/api/user/:userId/favorites/",
  favoriteActions.browseFavoritesByUser,
);

router.get(
  "/api/user/:userId/favorites/:recipeId",
  favoriteActions.readSingleFavorite,
);

router.patch(
  "/api/user/:userId/favorites/:recipeId/",
  favoriteActions.removeFavorite,
);

/* ************************************************************************* */

export default router;
