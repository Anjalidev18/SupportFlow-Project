import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import Toast from '../../../components/ui/Toast';
import { useToast } from '../../../hooks/useToast';
import { normalizeTicket } from '../../../utils/ticket';
import DeleteTicketModal from '../components/DeleteTicketModal';
import TicketFormModal from '../components/TicketFormModal';
import { notifyTicketsChanged } from '../constants';

const TicketActionsContext = createContext(null);

const SUCCESS_MESSAGES = {
  created: 'Ticket created successfully',
  updated: 'Ticket updated successfully',
  deleted: 'Ticket deleted successfully',
};

function TicketActionsProvider({ children }) {
  const [formModal, setFormModal] = useState({ isOpen: false, mode: 'create', ticket: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, ticket: null });
  const { toast, showToast, dismiss } = useToast();

  const openCreateModal = useCallback(() => {
    setFormModal({ isOpen: true, mode: 'create', ticket: null });
  }, []);

  const openEditModal = useCallback((ticket) => {
    setFormModal({
      isOpen: true,
      mode: 'edit',
      ticket: normalizeTicket(ticket),
    });
  }, []);

  const closeFormModal = useCallback(() => {
    setFormModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const openDeleteModal = useCallback((ticket) => {
    setDeleteModal({ isOpen: true, ticket: normalizeTicket(ticket) });
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModal({ isOpen: false, ticket: null });
  }, []);

  const handleMutationSuccess = useCallback(
    ({ action }) => {
      notifyTicketsChanged();
      showToast(SUCCESS_MESSAGES[action] || 'Ticket saved');
    },
    [showToast]
  );

  const value = useMemo(
    () => ({
      openCreateModal,
      openEditModal,
      openDeleteModal,
    }),
    [openCreateModal, openEditModal, openDeleteModal]
  );

  return (
    <TicketActionsContext.Provider value={value}>
      {children}

      <TicketFormModal
        isOpen={formModal.isOpen}
        mode={formModal.mode}
        ticket={formModal.ticket}
        onClose={closeFormModal}
        onSuccess={handleMutationSuccess}
      />

      <DeleteTicketModal
        isOpen={deleteModal.isOpen}
        ticket={deleteModal.ticket}
        onClose={closeDeleteModal}
        onSuccess={handleMutationSuccess}
      />

      <Toast toast={toast} onDismiss={dismiss} />
    </TicketActionsContext.Provider>
  );
}

export function useTicketActions() {
  const context = useContext(TicketActionsContext);
  if (!context) {
    throw new Error('useTicketActions must be used within a TicketActionsProvider');
  }
  return context;
}

export default TicketActionsProvider;
