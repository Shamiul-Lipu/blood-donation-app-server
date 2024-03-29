import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("Unauthorized Access");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
