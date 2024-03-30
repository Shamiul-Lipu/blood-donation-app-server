import express from "express";
import auth from "../../middleware/auth";
import { BloodDonationControllers } from "./bloodDonation.controller";
import validateRequest from "../../middleware/validateRequest";
import { updateRequestApplicationStatusValidator } from "./bloodDonation.validation";

const router = express.Router();

router.get("/donor-list", auth(), BloodDonationControllers.getAllFromDB);

router.post(
  "/donation-request",
  auth(),
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
