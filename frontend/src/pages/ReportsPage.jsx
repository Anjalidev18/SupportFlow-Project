import { useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import DashboardSection from '../features/dashboard/components/DashboardSection';
import DashboardSkeleton from '../features/dashboard/components/DashboardSkeleton';
import ReportStatsGrid from '../features/reports/components/ReportStatsGrid';
import {
  CreationTrendChart,
  PriorityChart,
  StatusChart,
} from '../features/reports/components/ReportCharts';
import { useReports } from '../features/reports/hooks/useReports';
import { TICKETS_CHANGED_EVENT } from '../features/tickets/constants';

function ReportsPage() {
  const { data, loading, error, refetch } = useReports();

  useEffect(() => {
    function handleTicketsChanged() {
      refetch();
    }

    window.addEventListener(TICKETS_CHANGED_EVENT, handleTicketsChanged);
    return () => window.removeEventListener(TICKETS_CHANGED_EVENT, handleTicketsChanged);
  }, [refetch]);

  return (
    <div className="reports-page">
      <PageHeader
        title="Reports"
        subtitle="Analytics and performance insights from your ticket data"
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
            {data && <ReportStatsGrid summary={data.summary} />}
          </DashboardSection>

          <section className="reports-page__charts" aria-label="Ticket analytics charts">
            {loading ? (
              <DashboardSection
                loading
                skeleton={<DashboardSkeleton variant="chart" />}
              />
            ) : (
              data && (
                <>
                  <Card className="reports-page__chart-card">
                    <CreationTrendChart data={data.creationTrend} />
                  </Card>

                  <div className="reports-page__chart-row">
                    <Card className="reports-page__chart-card">
                      <StatusChart data={data.byStatus} />
                    </Card>
                    <Card className="reports-page__chart-card">
                      <PriorityChart data={data.byPriority} />
                    </Card>
                  </div>
                </>
              )
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default ReportsPage;
