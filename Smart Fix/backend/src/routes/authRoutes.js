import express from "express";
import {
  login,
  loginValidation,
  registerProvider,
  registerProviderValidation,
  registerUser,
  registerUserValidation
} from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/register/user", registerUserValidation, validate, registerUser);
router.post("/register/provider", registerProviderValidation, validate, registerProvider);
router.post("/login", loginValidation, validate, login);

export default router;
