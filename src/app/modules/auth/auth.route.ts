import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  loginValidationSchema,
  registerUserValidationSchema,
} from "./auth.validator";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerUserValidationSchema),
  AuthControllers.registerUser
);

router.post(
  "/login",
  validateRequest(loginValidationSchema),
  AuthControllers.loginUser
);

router.post("/refresh-token", AuthControllers.refreshToken);

export const AuthRoutes = router;
