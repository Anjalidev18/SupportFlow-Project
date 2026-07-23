export function mapApiDetailsToFieldErrors(details = []) {
  return details.reduce((acc, { field, message }) => {
    if (field && message) {
      acc[field] = message;
    }
    return acc;
  }, {});
}
