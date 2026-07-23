import { useNavigate } from 'react-router-dom';
import { IconTrendUp, IconTrendDown } from '../icons';

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  variant = 'default',
  featured = false,
  href,
}) {
  const navigate = useNavigate();
  const TrendIcon = trend?.direction === 'down' ? IconTrendDown : IconTrendUp;

  const sentiment = trend?.sentiment ?? 'neutral';
  const trendClass = `stat-card__trend--${sentiment}`;

  const isInteractive = Boolean(href);

  function handleClick() {
    if (href) navigate(href);
  }

  function handleKeyDown(event) {
    if (isInteractive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleClick();
    }
  }

  const className = [
    'stat-card',
    `stat-card--${variant}`,
    featured ? 'stat-card--featured' : '',
    isInteractive ? 'stat-card--interactive' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={className}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      role={isInteractive ? 'link' : undefined}
      aria-label={isInteractive ? `View ${label.toLowerCase()}` : undefined}
    >
      <div className="stat-card__top">
        <div className={`stat-card__icon stat-card__icon--${variant}`}>
          <Icon size={18} />
        </div>
        {trend && (
          <span className={`stat-card__trend ${trendClass}`} title="vs last week">
            <TrendIcon size={14} />
            {trend.value}%
          </span>
        )}
      </div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  );
}

export default StatCard;
