import { useState } from 'react';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import AuthFormError from '../../auth/components/AuthFormError';
import { deleteTicket } from '../../../services/ticketsApi';

function DeleteTicketModal({ isOpen, ticket, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleDelete() {
    if (!ticket?.id) return;

    setLoading(true);
    setError('');

    try {
      await deleteTicket(ticket.id);
      onSuccess({ action: 'deleted', ticket });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to delete ticket');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete ticket"
      subtitle={ticket ? `${ticket.displayId}: ${ticket.title}` : undefined}
      size="sm"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="button" variant="danger" onClick={handleDelete} loading={loading}>
            Delete ticket
          </Button>
        </>
      }
    >
      <AuthFormError message={error} />
      <p>
        This action cannot be undone. The ticket will be permanently removed from the system.
      </p>
    </Modal>
  );
}

export default DeleteTicketModal;
