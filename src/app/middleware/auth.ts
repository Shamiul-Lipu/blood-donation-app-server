import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import config from "../config";
import { verifyToken } from "../../helper/jwtToken";
import { Secret } from "jsonwebtoken";

const auth = (...roles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("Unauthorized Access");
    }

    const verifiedUser = verifyToken(token, config.jwt_access_secret as Secret);

    req.user = verifiedUser;

    if (roles.length && !roles.includes(verifiedUser.role)) {
      throw new Error("Unauthorized Access");
    }
    next();
  });
};

export default auth;
