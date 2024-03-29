import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { loginValidationSchema } from "./auth.validator";

const router = express.Router();

router.post("/register", AuthControllers.registerUser);

router.post(
  "/login",
  validateRequest(loginValidationSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;
