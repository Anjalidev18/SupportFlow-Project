import Button from '../components/ui/Button';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import { IconPlus, IconUsers } from '../components/icons';
import TeamMembersTable from '../features/team/components/TeamMembersTable';
import { useTeamActions } from '../features/team/context/TeamActionsContext';
import { useTeamMembers } from '../features/team/hooks/useTeamMembers';

function TeamPage() {
  const { members, loading, error, refetch } = useTeamMembers();
  const { openCreateModal, openEditModal, openDeleteModal } = useTeamActions();

  return (
    <div className="team-page">
      <PageHeader
        title="Team"
        subtitle="Manage team members and access"
        actions={
          <Button variant="primary" size="sm" onClick={openCreateModal}>
            <IconPlus size={16} />
            Add member
          </Button>
        }
      />

      {error && (
        <div className="alert alert--error team-page__error" role="alert">
          <p>{error}</p>
          <Button variant="secondary" size="sm" onClick={refetch}>
            Try again
          </Button>
        </div>
      )}

      {loading && (
        <div className="team-page__loading">
          <Spinner size="lg" />
        </div>
      )}

      {!loading && !error && members.length === 0 && (
        <Card>
          <EmptyState
            icon={<IconUsers size={40} />}
            title="No team members yet"
            description="Add your first team member to start collaborating on support tickets."
            actionLabel="Add member"
            onAction={openCreateModal}
          />
        </Card>
      )}

      {!loading && !error && members.length > 0 && (
        <Card flush>
          <TeamMembersTable
            members={members}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        </Card>
      )}
    </div>
  );
}

export default TeamPage;
