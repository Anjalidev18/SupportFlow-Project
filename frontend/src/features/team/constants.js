export const MEMBER_ROLES = ['admin', 'agent', 'viewer'];

export const MEMBER_STATUSES = ['active', 'inactive'];

export const MEMBER_ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'agent', label: 'Agent' },
  { value: 'viewer', label: 'Viewer' },
];

export const MEMBER_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export const MEMBER_ROLE_LABELS = {
  admin: 'Admin',
  agent: 'Agent',
  viewer: 'Viewer',
};

export const MEMBER_STATUS_LABELS = {
  active: 'Active',
  inactive: 'Inactive',
};

export const TEAM_CHANGED_EVENT = 'team:changed';

export function notifyTeamChanged() {
  window.dispatchEvent(new Event(TEAM_CHANGED_EVENT));
}
