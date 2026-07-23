function Card({ title, children, className = '', hover = false, headerAction, flush = false }) {
  const classes = ['card', hover ? 'card--hover' : '', flush ? 'card--flush' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {title && (
        <div className="card__header">
          <h3 className="card__title">{title}</h3>
          {headerAction}
        </div>
      )}
      <div className={flush ? 'card__body card__body--flush' : 'card__body'}>{children}</div>
    </div>
  );
}

export default Card;
