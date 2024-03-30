import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { BloodDonationRoutes } from "../modules/bloodDonation/bloodDonation.route";

const router = Router();

const moduleRoutes = [
  { path: "/api", route: AuthRoutes },
  { path: "/api", route: UserRoutes },
  { path: "/api", route: BloodDonationRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
