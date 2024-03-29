import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err?.message || "Something went wrong!";
  let errorDetails;

  // The response for all errors
  return res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
    MyError: err,
  });
};

export default globalErrorHandler;
