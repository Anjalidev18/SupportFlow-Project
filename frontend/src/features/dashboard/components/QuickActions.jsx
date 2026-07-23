import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { IconPlus, IconTicket } from '../../../components/icons';
import { useTicketActions } from '../../tickets/context/TicketActionsContext';

function QuickActions() {
  const { openCreateModal } = useTicketActions();

  return (
    <nav className="quick-actions" aria-label="Quick actions">
      <h2 className="quick-actions__title">Quick Actions</h2>
      <ul className="quick-actions__list">
        <li>
          <Button
            variant="primary"
            size="sm"
            className="quick-actions__btn"
            onClick={openCreateModal}
            aria-label="Create new ticket"
          >
            <IconPlus size={16} />
            New ticket
          </Button>
        </li>
        <li>
          <Link to="/tickets" className="quick-actions__link">
            <IconTicket size={16} />
            View all tickets
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default QuickActions;
