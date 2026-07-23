const STATUS_COLORS = {
  open: '#52525b',
  in_progress: '#1d4ed8',
  resolved: '#15803d',
};

function StatusBreakdown({ data }) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div
      className="status-breakdown"
      role="img"
      aria-label={`Status breakdown: ${data.map((d) => `${d.label} ${d.count}`).join(', ')}`}
    >
      <h2 className="status-breakdown__title">Status Breakdown</h2>

      <div className="status-breakdown__bar" aria-hidden="true">
        {data.map((item) => (
          <div
            key={item.status}
            className="status-breakdown__segment"
            style={{
              width: `${item.percentage}%`,
              backgroundColor: STATUS_COLORS[item.status] || '#71717a',
            }}
            title={`${item.label}: ${item.count}`}
          />
        ))}
      </div>

      <ul className="status-breakdown__legend">
        {data.map((item) => (
          <li key={item.status} className="status-breakdown__legend-item">
            <span
              className="status-breakdown__swatch"
              style={{ backgroundColor: STATUS_COLORS[item.status] || '#71717a' }}
              aria-hidden="true"
            />
            <span className="status-breakdown__legend-label">{item.label}</span>
            <span className="status-breakdown__legend-value">{item.count}</span>
          </li>
        ))}
      </ul>

      <p className="status-breakdown__total" aria-hidden="true">
        <span className="status-breakdown__total-value">{total}</span>
        <span className="status-breakdown__total-label">total tickets</span>
      </p>
    </div>
  );
}

export default StatusBreakdown;
