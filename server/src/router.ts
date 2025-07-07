import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";
import lastRecipesActions from "./modules/lastRepipes/recipesActions";

router.get("/api/last-recipes", lastRecipesActions.browse);
router.get("/api/last-recipes/:id", lastRecipesActions.read);

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

export default router;
