import express from "express";
import auth from "../../middleware/auth";
import { BloodDonationControllers } from "./bloodDonation.controller";

const router = express.Router();

router.get("/donor-list", auth(), BloodDonationControllers.getAllFromDB);

export const BloodDonationRoutes = router;
