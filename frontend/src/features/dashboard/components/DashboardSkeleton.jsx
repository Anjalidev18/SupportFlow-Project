function DashboardSkeleton({ variant = 'card' }) {
  if (variant === 'stats') {
    return (
      <div className="dashboard-skeleton dashboard-skeleton--stats" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="dashboard-skeleton__stat">
            <div className="skeleton skeleton--text" style={{ width: '40%' }} />
            <div className="skeleton" style={{ height: 28, width: '50%', marginTop: 12 }} />
            <div className="skeleton skeleton--text" style={{ width: '60%', marginTop: 8 }} />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div className="dashboard-skeleton dashboard-skeleton--chart" aria-hidden="true">
        <div className="skeleton skeleton--text" style={{ width: '40%', marginBottom: 16 }} />
        <div className="skeleton" style={{ height: 160 }} />
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className="dashboard-skeleton dashboard-skeleton--table" aria-hidden="true">
        <div className="skeleton skeleton--text" style={{ width: '30%', marginBottom: 16 }} />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton skeleton--row" />
        ))}
      </div>
    );
  }

  if (variant === 'activity') {
    return (
      <div className="dashboard-skeleton dashboard-skeleton--activity" aria-hidden="true">
        <div className="skeleton skeleton--text" style={{ width: '40%', marginBottom: 16 }} />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="dashboard-skeleton__activity-row">
            <div className="skeleton" style={{ width: 28, height: 28, borderRadius: '50%' }} />
            <div style={{ flex: 1 }}>
              <div className="skeleton skeleton--text" />
              <div className="skeleton skeleton--text" style={{ width: '70%', marginTop: 6 }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="dashboard-skeleton" aria-hidden="true">
      <div className="skeleton skeleton--text" />
      <div className="skeleton" style={{ height: 80, marginTop: 12 }} />
    </div>
  );
}

export default DashboardSkeleton;
