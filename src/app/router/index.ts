import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { BloodDonationRoutes } from "../modules/bloodDonation/bloodDonation.route";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/user", route: UserRoutes },
  { path: "/blood-donation", route: BloodDonationRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
