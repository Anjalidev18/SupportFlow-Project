function AuthFormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  hint,
  placeholder,
  autoComplete,
  required = true,
}) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className={`form-input form-input--auth ${error ? 'form-input--error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
      />
      {hint && !error && (
        <p id={hintId} className="form-helper">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default AuthFormField;
