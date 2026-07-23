const STATUS_LABELS = {
  open: 'Open',
  in_progress: 'In Progress',
  on_hold: 'On Hold',
  resolved: 'Resolved',
  closed: 'Closed',
};

const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

const ACTIVITY_LABELS = {
  created: 'created ticket',
  assigned: 'assigned ticket',
  resolved: 'resolved ticket',
  commented: 'commented on',
  status_changed: 'updated status on',
};

export function formatStatus(status) {
  return STATUS_LABELS[status] || status;
}

export function formatPriority(priority) {
  return PRIORITY_LABELS[priority] || priority;
}

export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatRelativeTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatActivityMessage(activity) {
  const action = ACTIVITY_LABELS[activity.action] || activity.action;
  const detail = activity.detail ? ` (${activity.detail})` : '';
  return `${action} ${activity.target}${detail}`;
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
