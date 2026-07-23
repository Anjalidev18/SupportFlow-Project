function AuthFormSuccess({ title, message, children }) {
  return (
    <div className="auth-success" role="status">
      <div className="auth-success__icon" aria-hidden="true">
        ✓
      </div>
      {title && <h2 className="auth-success__title">{title}</h2>}
      <p className="auth-success__message">{message}</p>
      {children && <div className="auth-success__actions">{children}</div>}
    </div>
  );
}

export default AuthFormSuccess;
