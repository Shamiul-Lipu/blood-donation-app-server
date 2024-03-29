import express from "express";
import auth from "../../middleware/auth";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.get("/my-profile", auth(), UserControllers.getMyProfile);

router.put("/my-profile", auth(), UserControllers.updateMyProfile);

export const UserRoutes = router;
