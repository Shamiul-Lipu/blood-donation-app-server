import express from "express";
import auth from "../../middleware/auth";
import { UserControllers } from "./user.controller";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/my-profile",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  UserControllers.getMyProfile
);

router.put(
  "/my-profile",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  UserControllers.updateMyProfile
);

export const UserRoutes = router;
