import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router();

const moduleRoutes = [{ path: "/api", route: AuthRoutes }];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
