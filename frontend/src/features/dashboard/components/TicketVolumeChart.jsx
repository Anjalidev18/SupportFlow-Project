function TicketVolumeChart({ data }) {
  const maxValue = Math.max(...data.flatMap((d) => [d.created, d.resolved]), 1);

  const summary = data.reduce(
    (acc, d) => ({ created: acc.created + d.created, resolved: acc.resolved + d.resolved }),
    { created: 0, resolved: 0 }
  );

  return (
    <div
      className="volume-chart"
      role="img"
      aria-label={`Ticket volume over 7 days: ${summary.created} created, ${summary.resolved} resolved`}
    >
      <div className="volume-chart__header">
        <h2 className="volume-chart__title">Ticket Volume</h2>
        <div className="volume-chart__legend" aria-hidden="true">
          <span className="volume-chart__legend-item">
            <span className="volume-chart__dot volume-chart__dot--created" />
            Created
          </span>
          <span className="volume-chart__legend-item">
            <span className="volume-chart__dot volume-chart__dot--resolved" />
            Resolved
          </span>
        </div>
      </div>

      <div className="volume-chart__bars">
        {data.map((point) => (
          <div key={point.label} className="volume-chart__group">
            <div className="volume-chart__bar-pair" aria-hidden="true">
              <div
                className="volume-chart__bar volume-chart__bar--created"
                style={{ height: `${(point.created / maxValue) * 100}%` }}
                title={`Created: ${point.created}`}
              />
              <div
                className="volume-chart__bar volume-chart__bar--resolved"
                style={{ height: `${(point.resolved / maxValue) * 100}%` }}
                title={`Resolved: ${point.resolved}`}
              />
            </div>
            <span className="volume-chart__label">{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketVolumeChart;
