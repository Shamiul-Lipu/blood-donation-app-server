const handleUnauthorizedError = () => {
  const statusCode = 400;
  const message = "Unauthorized Access";
  const errorMessage =
    "You do not have the necessary permissions to access this resource.";
  const errorDetails = null;

  return {
    statusCode,
    message: `${message}, ${errorMessage}`,
    errorDetails,
  };
};

export default handleUnauthorizedError;
