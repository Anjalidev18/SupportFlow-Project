import Button from '../components/ui/Button';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import TicketsTable from '../components/tickets/TicketsTable';
import { IconPlus, IconTicket } from '../components/icons';
import { useTicketActions } from '../features/tickets/context/TicketActionsContext';
import { useTickets } from '../features/tickets/hooks/useTickets';

function TicketsPage() {
  const { tickets, loading, error, refetch } = useTickets();
  const { openCreateModal, openEditModal, openDeleteModal } = useTicketActions();

  return (
    <div className="tickets-page">
      <PageHeader
        title="Tickets"
        subtitle="View and manage all support tickets"
        actions={
          <Button variant="primary" size="sm" onClick={openCreateModal}>
            <IconPlus size={16} />
            New ticket
          </Button>
        }
      />

      {error && (
        <div className="alert alert--error tickets-page__error" role="alert">
          <p>{error}</p>
          <Button variant="secondary" size="sm" onClick={refetch}>
            Try again
          </Button>
        </div>
      )}

      {loading && (
        <div className="tickets-page__loading">
          <Spinner size="lg" />
        </div>
      )}

      {!loading && !error && tickets.length === 0 && (
        <Card>
          <EmptyState
            icon={<IconTicket size={40} />}
            title="No tickets yet"
            description="When tickets are created they'll appear here. Create your first ticket to get started."
            actionLabel="Create ticket"
            onAction={openCreateModal}
          />
        </Card>
      )}

      {!loading && !error && tickets.length > 0 && (
        <Card flush>
          <TicketsTable
            tickets={tickets}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        </Card>
      )}
    </div>
  );
}

export default TicketsPage;
