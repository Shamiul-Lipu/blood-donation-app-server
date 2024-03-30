import { ZodError } from "zod";

const handleZodError = (err: ZodError) => {
  const statusCode = 400;
  const message = "Validation Error";

  const issues = err.issues.map((issue) => {
    return {
      path: issue.path.map((str) => str),
      message: issue.message,
    };
  });

  //   console.log(issues.map((str) => `${str.path} is ${str.message}`));
  //   const concatenatedErrorMessage = errorMessages.join(', ');

  const errorMessage = issues
    ?.map((str) => `${str?.path} is ${str?.message}`)
    .join(". ")
    .toLowerCase();

  return {
    statusCode,
    message: `${message}, ${errorMessage}`,
    errorDetails: err,
  };
};

export default handleZodError;
