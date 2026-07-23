function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="auth-card">
      <div className="auth-card__header">
        <h1 className="auth-card__title">{title}</h1>
        {subtitle && <p className="auth-card__subtitle">{subtitle}</p>}
      </div>
      <div className="auth-card__body">{children}</div>
      {footer && <div className="auth-card__footer">{footer}</div>}
    </div>
  );
}

export default AuthCard;
