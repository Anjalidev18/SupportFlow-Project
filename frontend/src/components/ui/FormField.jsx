function FormField({
  id,
  label,
  type = 'text',
  as = 'input',
  value,
  onChange,
  error,
  hint,
  placeholder,
  autoComplete,
  required = true,
  disabled = false,
  options = [],
}) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  const fieldClassName = error ? 'form-input--error' : '';

  function renderControl() {
    if (as === 'textarea') {
      return (
        <textarea
          id={id}
          name={id}
          className={`form-textarea ${fieldClassName}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          rows={4}
        />
      );
    }

    if (as === 'select') {
      return (
        <select
          id={id}
          name={id}
          className={`form-select ${fieldClassName}`}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        id={id}
        name={id}
        type={type}
        className={`form-input ${fieldClassName}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
      />
    );
  }

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {renderControl()}
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

export default FormField;
