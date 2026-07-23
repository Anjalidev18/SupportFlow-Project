import { useEffect, useState } from 'react';
import Button from '../../../components/ui/Button';
import FormField from '../../../components/ui/FormField';
import Modal from '../../../components/ui/Modal';
import AuthFormError from '../../auth/components/AuthFormError';
import { clearFieldError } from '../../auth/utils/formHelpers';
import { createTicket, updateTicket } from '../../../services/ticketsApi';
import { TICKET_PRIORITY_OPTIONS, TICKET_STATUS_OPTIONS } from '../constants';
import { mapApiDetailsToFieldErrors } from '../../../utils/apiErrors';
import { hasErrors, validateTicketForm } from '../utils/validation';

const EMPTY_FORM = {
  title: '',
  description: '',
  status: 'open',
  priority: 'medium',
};

function TicketFormModal({ isOpen, mode, ticket, onClose, onSuccess }) {
  const isEdit = mode === 'edit';
  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (isEdit && ticket) {
      setForm({
        title: ticket.title ?? '',
        description: ticket.description ?? '',
        status: ticket.status ?? 'open',
        priority: ticket.priority ?? 'medium',
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setFieldErrors({});
    setFormError('');
  }, [isOpen, isEdit, ticket]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => clearFieldError(prev, field));
    setFormError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError('');

    const errors = validateTicketForm(form, { requireStatus: isEdit });
    if (hasErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      ...(isEdit ? { status: form.status } : {}),
    };

    try {
      const savedTicket = isEdit
        ? await updateTicket(ticket.id, payload)
        : await createTicket(payload);

      onSuccess({
        action: isEdit ? 'updated' : 'created',
        ticket: savedTicket,
      });
      onClose();
    } catch (err) {
      if (err.details?.length) {
        setFieldErrors(mapApiDetailsToFieldErrors(err.details));
      }
      setFormError(err.message || 'Failed to save ticket');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit ticket' : 'Create ticket'}
      subtitle={
        isEdit
          ? `Update details for ${ticket?.displayId ?? 'this ticket'}`
          : 'Add a new support ticket to the queue'
      }
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" form="ticket-form" variant="primary" loading={loading}>
            {isEdit ? 'Save changes' : 'Create ticket'}
          </Button>
        </>
      }
    >
      <form id="ticket-form" className="entity-form" onSubmit={handleSubmit} noValidate>
        <AuthFormError message={formError} />

        <FormField
          id="title"
          label="Title"
          value={form.title}
          onChange={(event) => updateField('title', event.target.value)}
          error={fieldErrors.title}
          placeholder="Brief summary of the issue"
        />

        <FormField
          id="description"
          label="Description"
          as="textarea"
          value={form.description}
          onChange={(event) => updateField('description', event.target.value)}
          error={fieldErrors.description}
          placeholder="Describe the issue in detail"
        />

        <div className="ticket-form__row">
          <FormField
            id="priority"
            label="Priority"
            as="select"
            value={form.priority}
            onChange={(event) => updateField('priority', event.target.value)}
            error={fieldErrors.priority}
            options={TICKET_PRIORITY_OPTIONS}
          />

          {isEdit && (
            <FormField
              id="status"
              label="Status"
              as="select"
              value={form.status}
              onChange={(event) => updateField('status', event.target.value)}
              error={fieldErrors.status}
              options={TICKET_STATUS_OPTIONS}
            />
          )}
        </div>
      </form>
    </Modal>
  );
}

export default TicketFormModal;
