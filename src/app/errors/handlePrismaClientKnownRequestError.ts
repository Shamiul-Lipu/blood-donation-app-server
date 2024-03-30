const handlePrismaClientKnownRequestError = (err: any) => {
  const statusCode = 400;
  const message = "PrismaClient Known Request Error";
  const errorMessage =
    "Expected error originating from PrismaClient operations, Possibly a duplicate error in PrismaClient operations.";
  const errorDetails = err;

  return {
    statusCode,
    message: `${message}, ${errorMessage}`,
    errorDetails,
  };
};

export default handlePrismaClientKnownRequestError;
