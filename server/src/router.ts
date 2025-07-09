import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import authActions from "./modules/auth/authActions";
// Define item-related routes
import itemActions from "./modules/item/itemActions";
import lastRecipesActions from "./modules/lastRepipes/recipesActions";

router.get("/api/last-recipes", lastRecipesActions.browse);
router.get("/api/last-recipes/:id", lastRecipesActions.read);
import auth from "./utils/auth";
import validation from "./utils/validation";

router.post("/api/login", authActions.browse);
router.post(
  "/api/signup",
  validation.authValidation,
  auth.hashPassword,
  authActions.add,
);

/* ************************************************************************* */

export default router;
