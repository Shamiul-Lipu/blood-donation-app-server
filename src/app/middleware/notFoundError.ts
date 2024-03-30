import { NextFunction, Request, Response } from "express";

const notFoundError = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    success: false,
    message: `API Not Found! Route Not Found for ${req.originalUrl}`,
    errorDetails: "",
  });
};

export default notFoundError;
