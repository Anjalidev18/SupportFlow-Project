import { Link } from 'react-router-dom';
import TicketDataTable from '../../../components/tickets/TicketDataTable';

function RecentTicketsPanel({ tickets }) {
  return (
    <div className="recent-tickets">
      <div className="recent-tickets__header">
        <h2 className="recent-tickets__title">Recent Tickets</h2>
        <Link to="/tickets" className="recent-tickets__link">
          View all
        </Link>
      </div>
      <TicketDataTable tickets={tickets} variant="compact" />
    </div>
  );
}

export default RecentTicketsPanel;
