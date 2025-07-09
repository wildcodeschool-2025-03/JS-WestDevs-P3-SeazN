import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import authActions from "./modules/auth/authActions";
// Define item-related routes
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
