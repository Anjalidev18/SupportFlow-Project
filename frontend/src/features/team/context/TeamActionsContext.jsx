import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import Toast from '../../../components/ui/Toast';
import { useToast } from '../../../hooks/useToast';
import DeleteMemberModal from '../components/DeleteMemberModal';
import MemberFormModal from '../components/MemberFormModal';
import { notifyTeamChanged } from '../constants';

const TeamActionsContext = createContext(null);

const SUCCESS_MESSAGES = {
  created: 'Team member added successfully',
  updated: 'Team member updated successfully',
  deleted: 'Team member removed successfully',
};

function TeamActionsProvider({ children }) {
  const [formModal, setFormModal] = useState({ isOpen: false, mode: 'create', member: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, member: null });
  const { toast, showToast, dismiss } = useToast();

  const openCreateModal = useCallback(() => {
    setFormModal({ isOpen: true, mode: 'create', member: null });
  }, []);

  const openEditModal = useCallback((member) => {
    setFormModal({ isOpen: true, mode: 'edit', member });
  }, []);

  const closeFormModal = useCallback(() => {
    setFormModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const openDeleteModal = useCallback((member) => {
    setDeleteModal({ isOpen: true, member });
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModal({ isOpen: false, member: null });
  }, []);

  const handleMutationSuccess = useCallback(
    ({ action }) => {
      notifyTeamChanged();
      showToast(SUCCESS_MESSAGES[action] || 'Team member saved');
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
    <TeamActionsContext.Provider value={value}>
      {children}

      <MemberFormModal
        isOpen={formModal.isOpen}
        mode={formModal.mode}
        member={formModal.member}
        onClose={closeFormModal}
        onSuccess={handleMutationSuccess}
      />

      <DeleteMemberModal
        isOpen={deleteModal.isOpen}
        member={deleteModal.member}
        onClose={closeDeleteModal}
        onSuccess={handleMutationSuccess}
      />

      <Toast toast={toast} onDismiss={dismiss} />
    </TeamActionsContext.Provider>
  );
}

export function useTeamActions() {
  const context = useContext(TeamActionsContext);
  if (!context) {
    throw new Error('useTeamActions must be used within a TeamActionsProvider');
  }
  return context;
}

export default TeamActionsProvider;
