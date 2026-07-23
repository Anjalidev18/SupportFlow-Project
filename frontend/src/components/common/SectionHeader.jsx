function SectionHeader({ title, subtitle, align = 'center', className = '' }) {
  const classes = ['section-header', `section-header--${align}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classes}>
      <h2 className="section-header__title">{title}</h2>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
    </header>
  );
}

export default SectionHeader;
