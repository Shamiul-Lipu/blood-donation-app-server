import { AnyZodObject, ZodSchema } from "zod";
import { NextFunction, Request, Response } from "express";

const validateRequest = (schema: AnyZodObject | ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(req.body);
    if (!result.success) {
      next(result.error);
    } else {
      req.body = result.data;
      next();
    }
  };
};

export default validateRequest;
