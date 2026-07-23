/**
 * Normalizes ticket objects from API or mock sources into a consistent shape.
 * @param {object} ticket - Raw ticket from API (_id) or mock (id)
 * @returns {object} Normalized ticket
 */
export function normalizeTicket(ticket) {
  const rawId = ticket._id ?? ticket.id;
  const displayId =
    ticket.displayId ??
    (typeof rawId === 'string' && rawId.startsWith('SF-')
      ? rawId
      : `SF-${String(rawId).slice(-4).toUpperCase()}`);

  let customer = null;
  if (typeof ticket.customer === 'string') {
    customer = ticket.customer;
  } else if (ticket.customer?.email) {
    customer = ticket.customer.email;
  }

  return {
    id: rawId,
    displayId,
    title: ticket.title,
    description: ticket.description ?? '',
    status: ticket.status,
    priority: ticket.priority,
    assignee: ticket.assignee ?? null,
    customer,
    createdAt: ticket.createdAt,
  };
}
