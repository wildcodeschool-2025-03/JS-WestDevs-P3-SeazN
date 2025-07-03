import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import authActions from "./modules/auth/authActions";
// Define item-related routes
import itemActions from "./modules/item/itemActions";
import auth from "./utils/auth";
import validation from "./utils/validation";

router.get("/api/items", itemActions.browse);
// router.get("/api/items/:id", itemActions.read);
router.post(
  "/api/signup",
  validation.authValidation,
  auth.hashPassword,
  authActions.add,
);

/* ************************************************************************* */

export default router;
