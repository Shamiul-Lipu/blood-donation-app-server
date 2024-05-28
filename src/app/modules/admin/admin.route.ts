import express from "express";
import { AdminControllers } from "./admin.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middleware/validateRequest";
import { userManagementValidationSchema } from "./admin.validatior";

const router = express.Router();

router.get(
  "/user-management",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminControllers.getAllUser
);

router.put(
  "/user-management",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(userManagementValidationSchema),
  AdminControllers.userManagement
);

export const AdminRoutes = router;
