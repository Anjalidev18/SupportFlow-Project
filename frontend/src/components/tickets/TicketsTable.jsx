import TicketDataTable from './TicketDataTable';

function TicketsTable({ tickets, onEdit, onDelete }) {
  return (
    <TicketDataTable
      tickets={tickets}
      variant="full"
      showActions
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}

export default TicketsTable;
