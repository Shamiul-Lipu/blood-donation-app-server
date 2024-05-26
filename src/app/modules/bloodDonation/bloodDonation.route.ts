import express from "express";
import auth from "../../middleware/auth";
import { BloodDonationControllers } from "./bloodDonation.controller";
import validateRequest from "../../middleware/validateRequest";
import { updateRequestApplicationStatusValidator } from "./bloodDonation.validation";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/donor-list", BloodDonationControllers.getAllFromDB);

router.get("/donor-details/:id", BloodDonationControllers.getDonorDetails);

router.post(
  "/donation-request",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  BloodDonationControllers.requestForBlood
);

router.get(
  "/donation-request",
  auth(),
  BloodDonationControllers.getDonationRequests
);

router.put(
  "/donation-request/:requestId",
  auth(),
  validateRequest(updateRequestApplicationStatusValidator),
  BloodDonationControllers.updateRequestApplicationStatus
);

export const BloodDonationRoutes = router;
