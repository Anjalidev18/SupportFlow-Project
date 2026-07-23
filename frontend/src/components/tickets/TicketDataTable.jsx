import Badge from '../ui/Badge';
import { IconPencil, IconTrash } from '../icons';
import { formatStatus, formatPriority, formatRelativeTime, formatDate } from '../../utils/format';
import { normalizeTicket } from '../../utils/ticket';

const COMPACT_COLUMNS = ['id', 'title', 'status', 'priority', 'assignee', 'created'];
const FULL_COLUMNS = ['title', 'status', 'priority', 'created'];

function TicketDataTable({
  tickets,
  variant = 'compact',
  showActions = true,
  onEdit,
  onDelete,
}) {
  const normalized = tickets.map(normalizeTicket);
  const columns = variant === 'full' ? FULL_COLUMNS : COMPACT_COLUMNS;
  const hasRowActions = showActions && (onEdit || onDelete);

  function handleEditClick(event, ticket) {
    event.stopPropagation();
    onEdit?.(ticket);
  }

  function handleDeleteClick(event, ticket) {
    event.stopPropagation();
    onDelete?.(ticket);
  }

  return (
    <div className="table-wrapper ticket-data-table__wrapper">
      <table className="table ticket-data-table" aria-label="Support tickets">
        <thead>
          <tr>
            {columns.includes('id') && <th scope="col">ID</th>}
            {columns.includes('title') && <th scope="col">Title</th>}
            {columns.includes('status') && <th scope="col">Status</th>}
            {columns.includes('priority') && <th scope="col">Priority</th>}
            {columns.includes('assignee') && (
              <th scope="col" className="ticket-data-table__hide-sm">
                Assignee
              </th>
            )}
            {columns.includes('created') && (
              <th scope="col" className="ticket-data-table__hide-md">
                Created
              </th>
            )}
            {hasRowActions && (
              <th scope="col" className="ticket-data-table__actions-col">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {normalized.map((ticket) => (
            <tr key={ticket.id} className="ticket-data-table__row">
              {columns.includes('id') && (
                <td className="ticket-data-table__id">{ticket.displayId}</td>
              )}
              {columns.includes('title') && (
                <td className="ticket-data-table__title-cell">
                  <span className="ticket-data-table__ticket-title">{ticket.title}</span>
                  {variant === 'compact' && ticket.customer && (
                    <span className="ticket-data-table__customer">{ticket.customer}</span>
                  )}
                </td>
              )}
              {columns.includes('status') && (
                <td>
                  <Badge status={ticket.status}>{formatStatus(ticket.status)}</Badge>
                </td>
              )}
              {columns.includes('priority') && (
                <td>
                  <Badge priority={ticket.priority} showDot={false}>
                    {formatPriority(ticket.priority)}
                  </Badge>
                </td>
              )}
              {columns.includes('assignee') && (
                <td className="ticket-data-table__hide-sm">
                  {ticket.assignee ? (
                    <span className="ticket-data-table__assignee">{ticket.assignee}</span>
                  ) : (
                    <span className="ticket-data-table__unassigned">Unassigned</span>
                  )}
                </td>
              )}
              {columns.includes('created') && (
                <td
                  className="ticket-data-table__hide-md ticket-data-table__time"
                  title={formatDate(ticket.createdAt)}
                >
                  {formatRelativeTime(ticket.createdAt)}
                </td>
              )}
              {hasRowActions && (
                <td className="ticket-data-table__actions-col">
                  <div className="ticket-data-table__actions">
                    {onEdit && (
                      <button
                        type="button"
                        className="ticket-data-table__action-btn"
                        aria-label={`Edit ticket ${ticket.displayId}`}
                        onClick={(event) => handleEditClick(event, ticket)}
                      >
                        <IconPencil size={16} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        className="ticket-data-table__action-btn ticket-data-table__action-btn--danger"
                        aria-label={`Delete ticket ${ticket.displayId}`}
                        onClick={(event) => handleDeleteClick(event, ticket)}
                      >
                        <IconTrash size={16} />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketDataTable;
