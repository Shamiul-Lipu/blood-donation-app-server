import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  changePasswordValidationSchema,
  loginValidationSchema,
  registerUserValidationSchema,
} from "./auth.validator";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

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

router.post(
  "/change-password",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  validateRequest(changePasswordValidationSchema),
  AuthControllers.changePassword
);

router.post("/refresh-token", AuthControllers.refreshToken);

export const AuthRoutes = router;
