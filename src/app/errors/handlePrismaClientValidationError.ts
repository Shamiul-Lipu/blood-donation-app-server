const handlePrismaClientValidationError = (err: any) => {
  const statusCode = 400;
  const message = "PrismaClient Known Request Error";
  const errorMessage =
    " Error related to validation within PrismaClient, Indicates potential missing fields.";
  const errorDetails = err;

  return {
    statusCode,
    message: `${message}, ${errorMessage}`,
    errorDetails,
  };
};

export default handlePrismaClientValidationError;
