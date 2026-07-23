import Button from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';

function DashboardSection({
  loading,
  error,
  onRetry,
  isEmpty,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  skeleton,
  children,
}) {
  if (loading) {
    return skeleton;
  }

  if (error) {
    return (
      <div className="dashboard-section__error" role="alert">
        <p className="dashboard-section__error-text">{error}</p>
        {onRetry && (
          <Button variant="secondary" size="sm" onClick={onRetry}>
            Try again
          </Button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return children;
}

export default DashboardSection;
