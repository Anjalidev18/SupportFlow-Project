export const TICKET_STATUSES = ['open', 'in_progress', 'resolved'];

export const TICKET_PRIORITIES = ['low', 'medium', 'high'];

export const TICKET_STATUS_OPTIONS = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
];

export const TICKET_PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export const TICKETS_CHANGED_EVENT = 'tickets:changed';

export function notifyTicketsChanged() {
  window.dispatchEvent(new Event(TICKETS_CHANGED_EVENT));
}
