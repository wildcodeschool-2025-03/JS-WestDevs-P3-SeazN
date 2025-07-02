import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";
import authActions from "./modules/auth/authActions";

router.get("/api/items", itemActions.browse);
// router.get("/api/items/:id", itemActions.read);
router.post("/api/signup", authActions.add);

/* ************************************************************************* */

export default router;
