import { IconPencil, IconTrash } from '../../../components/icons';
import { MEMBER_ROLE_LABELS, MEMBER_STATUS_LABELS } from '../constants';

function TeamMembersTable({ members, onEdit, onDelete }) {
  return (
    <div className="table-wrapper team-table__wrapper">
      <table className="table team-table" aria-label="Team members">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col" className="team-table__hide-sm">
              Email
            </th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col" className="team-table__actions-col">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="team-table__row">
              <td>
                <span className="team-table__name">{member.name}</span>
                <span className="team-table__email-mobile">{member.email}</span>
              </td>
              <td className="team-table__hide-sm team-table__email">{member.email}</td>
              <td>
                <span className={`member-badge member-badge--role-${member.role}`}>
                  {MEMBER_ROLE_LABELS[member.role] ?? member.role}
                </span>
              </td>
              <td>
                <span className={`member-badge member-badge--status-${member.status}`}>
                  {MEMBER_STATUS_LABELS[member.status] ?? member.status}
                </span>
              </td>
              <td className="team-table__actions-col">
                <div className="team-table__actions">
                  <button
                    type="button"
                    className="team-table__action-btn"
                    aria-label={`Edit ${member.name}`}
                    onClick={() => onEdit(member)}
                  >
                    <IconPencil size={16} />
                  </button>
                  <button
                    type="button"
                    className="team-table__action-btn team-table__action-btn--danger"
                    aria-label={`Remove ${member.name}`}
                    onClick={() => onDelete(member)}
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeamMembersTable;
