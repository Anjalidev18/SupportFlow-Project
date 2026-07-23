import { useState } from 'react';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import AuthFormError from '../../auth/components/AuthFormError';
import { deleteTeamMember } from '../services/teamApi';

function DeleteMemberModal({ isOpen, member, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleDelete() {
    if (!member?.id) return;

    setLoading(true);
    setError('');

    try {
      await deleteTeamMember(member.id);
      onSuccess({ action: 'deleted', member });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to delete team member');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Remove team member"
      subtitle={member ? `${member.name} (${member.email})` : undefined}
      size="sm"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="button" variant="danger" onClick={handleDelete} loading={loading}>
            Remove member
          </Button>
        </>
      }
    >
      <AuthFormError message={error} />
      <p>
        This will permanently remove the member account. They will no longer be able to sign in.
      </p>
    </Modal>
  );
}

export default DeleteMemberModal;
