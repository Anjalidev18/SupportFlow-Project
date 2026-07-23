import { useEffect } from 'react';
import { useAuth } from '../features/auth/context/AuthContext';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StatsGrid from '../components/dashboard/StatsGrid';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import { IconTicket } from '../components/icons';
import { getGreeting } from '../utils/format';
import { useDashboard } from '../features/dashboard/hooks/useDashboard';
import DashboardSection from '../features/dashboard/components/DashboardSection';
import DashboardSkeleton from '../features/dashboard/components/DashboardSkeleton';
import QuickActions from '../features/dashboard/components/QuickActions';
import TicketVolumeChart from '../features/dashboard/components/TicketVolumeChart';
import StatusBreakdown from '../features/dashboard/components/StatusBreakdown';
import RecentTicketsPanel from '../features/dashboard/components/RecentTicketsPanel';
import { TICKETS_CHANGED_EVENT } from '../features/tickets/constants';

function DashboardPage() {
  const { user } = useAuth();
  const { data, loading, error, refetch } = useDashboard();

  useEffect(() => {
    function handleTicketsChanged() {
      refetch();
    }

    window.addEventListener(TICKETS_CHANGED_EVENT, handleTicketsChanged);
    return () => window.removeEventListener(TICKETS_CHANGED_EVENT, handleTicketsChanged);
  }, [refetch]);

  const firstName = user?.name?.split(' ')[0] ?? 'there';
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="dashboard">
      <PageHeader
        subtitle={`${getGreeting()}, ${firstName} · ${today}`}
        title="Here's your support overview"
      />

      {error && (
        <Card>
          <div className="dashboard-section__error" role="alert">
            <p className="dashboard-section__error-text">{error}</p>
            <Button variant="secondary" size="sm" onClick={refetch}>
              Try again
            </Button>
          </div>
        </Card>
      )}

      {!error && (
        <>
          <DashboardSection
            loading={loading}
            skeleton={<DashboardSkeleton variant="stats" />}
          >
            {data && <StatsGrid stats={data.stats} />}
          </DashboardSection>

          <section className="dashboard__insights" aria-label="Ticket insights">
            <Card className="dashboard__card dashboard__card--chart">
              <DashboardSection
                loading={loading}
                skeleton={<DashboardSkeleton variant="chart" />}
              >
                {data && <TicketVolumeChart data={data.volumeChartData} />}
              </DashboardSection>
            </Card>

            <Card className="dashboard__card dashboard__card--status">
              <DashboardSection
                loading={loading}
                skeleton={<DashboardSkeleton variant="chart" />}
              >
                {data && <StatusBreakdown data={data.statusOverview} />}
              </DashboardSection>
            </Card>
          </section>

          <section className="dashboard__main" aria-label="Tickets and activity">
            <Card flush className="dashboard__card dashboard__card--tickets">
              <DashboardSection
                loading={loading}
                isEmpty={data?.recentTickets?.length === 0}
                emptyIcon={<IconTicket size={40} />}
                emptyTitle="No recent tickets"
                emptyDescription="New tickets will appear here once they are created."
                skeleton={<DashboardSkeleton variant="table" />}
              >
                {data && <RecentTicketsPanel tickets={data.recentTickets} />}
              </DashboardSection>
            </Card>

            <aside className="dashboard__aside">
              <Card className="dashboard__card">
                <QuickActions />
              </Card>

              <Card className="dashboard__card">
                <DashboardSection
                  loading={loading}
                  isEmpty={data?.activityFeed?.length === 0}
                  emptyTitle="No recent activity"
                  emptyDescription="Team actions on tickets will show up here."
                  skeleton={<DashboardSkeleton variant="activity" />}
                >
                  {data && <ActivityFeed activities={data.activityFeed} />}
                </DashboardSection>
              </Card>
            </aside>
          </section>
        </>
      )}
    </div>
  );
}

export default DashboardPage;
