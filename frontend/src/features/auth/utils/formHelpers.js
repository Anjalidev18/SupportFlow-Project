/**
 * Clears a single field error when the user edits the field.
 */
export function clearFieldError(fieldErrors, field) {
  if (!fieldErrors[field]) return fieldErrors;
  const next = { ...fieldErrors };
  delete next[field];
  return next;
}
