function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-header">
      <div className="page-header__content">
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
        <h1 className="page-header__title">{title}</h1>
      </div>
      {actions && <div className="page-header__actions">{actions}</div>}
    </div>
  );
}

export default PageHeader;
