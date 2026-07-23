import Card from '../ui/Card';

function FeatureCard({ icon: Icon, title, description, hover = true }) {
  return (
    <Card hover={hover} className="feature-card">
      {Icon && (
        <div className="feature-card__icon" aria-hidden="true">
          <Icon size={20} />
        </div>
      )}
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__description">{description}</p>
    </Card>
  );
}

export default FeatureCard;
