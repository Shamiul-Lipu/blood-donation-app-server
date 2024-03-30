import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleUnauthorizedError from "../errors/handleUnauthorizedError";
import handlePrismaClientValidationError from "../errors/handlePrismaClientValidationError";
import handlePrismaClientKnownRequestError from "../errors/handlePrismaClientKnownRequestError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err?.message || "Something went wrong!";
  let errorDetails;

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  } else if (err.name === "PrismaClientValidationError") {
    const simplifiedError = handlePrismaClientValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  } else if (err.name === "PrismaClientKnownRequestError") {
    const simplifiedError = handlePrismaClientKnownRequestError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  } else if (message === "Unauthorized Access") {
    const simplifiedError = handleUnauthorizedError();
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  } else if (err instanceof Error) {
    errorDetails = err;
  }

  // The response for all errors
  return res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;
