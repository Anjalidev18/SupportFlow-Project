const STATUS_MAP = {
  open: 'open',
  in_progress: 'in-progress',
  on_hold: 'on-hold',
  resolved: 'resolved',
  closed: 'closed',
};

function Badge({ status, priority, children, showDot = true }) {
  let variant = '';

  if (status) {
    variant = STATUS_MAP[status] || status;
  } else if (priority) {
    variant = `priority-${priority}`;
  }

  return (
    <span className={`badge badge--${variant}`}>
      {showDot && <span className="badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}

export default Badge;
