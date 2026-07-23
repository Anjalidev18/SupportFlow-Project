import { useEffect, useState } from 'react';
import Button from '../../../components/ui/Button';
import FormField from '../../../components/ui/FormField';
import Modal from '../../../components/ui/Modal';
import AuthFormError from '../../auth/components/AuthFormError';
import { clearFieldError } from '../../auth/utils/formHelpers';
import { mapApiDetailsToFieldErrors } from '../../../utils/apiErrors';
import { createTeamMember, updateTeamMember } from '../services/teamApi';
import {
  MEMBER_ROLE_OPTIONS,
  MEMBER_STATUS_OPTIONS,
} from '../constants';
import { hasErrors, validateMemberForm } from '../utils/validation';

const EMPTY_FORM = {
  name: '',
  email: '',
  password: '',
  role: 'agent',
  status: 'active',
};

function MemberFormModal({ isOpen, mode, member, onClose, onSuccess }) {
  const isEdit = mode === 'edit';
  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (isEdit && member) {
      setForm({
        name: member.name ?? '',
        email: member.email ?? '',
        password: '',
        role: member.role ?? 'agent',
        status: member.status ?? 'active',
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setFieldErrors({});
    setFormError('');
  }, [isOpen, isEdit, member]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => clearFieldError(prev, field));
    setFormError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError('');

    const errors = validateMemberForm(form, { isEdit });
    if (hasErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      status: form.status,
      ...(form.password ? { password: form.password } : {}),
    };

    try {
      const savedMember = isEdit
        ? await updateTeamMember(member.id, payload)
        : await createTeamMember(payload);

      onSuccess({
        action: isEdit ? 'updated' : 'created',
        member: savedMember,
      });
      onClose();
    } catch (err) {
      if (err.details?.length) {
        setFieldErrors(mapApiDetailsToFieldErrors(err.details));
      }
      setFormError(err.message || 'Failed to save team member');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit member' : 'Add member'}
      subtitle={
        isEdit
          ? `Update details for ${member?.name ?? 'this member'}`
          : 'Invite a new team member to SupportFlow'
      }
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" form="member-form" variant="primary" loading={loading}>
            {isEdit ? 'Save changes' : 'Add member'}
          </Button>
        </>
      }
    >
      <form id="member-form" className="entity-form" onSubmit={handleSubmit} noValidate>
        <AuthFormError message={formError} />

        <FormField
          id="name"
          label="Name"
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          error={fieldErrors.name}
          placeholder="Jane Smith"
          autoComplete="name"
        />

        <FormField
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(event) => updateField('email', event.target.value)}
          error={fieldErrors.email}
          placeholder="jane@company.com"
          autoComplete="email"
        />

        <FormField
          id="password"
          label={isEdit ? 'New password' : 'Password'}
          type="password"
          value={form.password}
          onChange={(event) => updateField('password', event.target.value)}
          error={fieldErrors.password}
          placeholder={isEdit ? 'Leave blank to keep current password' : 'Minimum 8 characters'}
          autoComplete={isEdit ? 'new-password' : 'new-password'}
          required={!isEdit}
          hint={isEdit ? 'Leave blank to keep the current password' : undefined}
        />

        <div className="ticket-form__row">
          <FormField
            id="role"
            label="Role"
            as="select"
            value={form.role}
            onChange={(event) => updateField('role', event.target.value)}
            error={fieldErrors.role}
            options={MEMBER_ROLE_OPTIONS}
          />

          <FormField
            id="status"
            label="Status"
            as="select"
            value={form.status}
            onChange={(event) => updateField('status', event.target.value)}
            error={fieldErrors.status}
            options={MEMBER_STATUS_OPTIONS}
          />
        </div>
      </form>
    </Modal>
  );
}

export default MemberFormModal;
