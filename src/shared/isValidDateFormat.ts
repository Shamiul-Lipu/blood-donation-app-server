export function isValidDateFormat(dateString: string) {
  // Regular expression to match the format "YYYY-MM-DD"
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateFormatRegex.test(dateString);
}
