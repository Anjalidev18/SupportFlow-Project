import StatCard from '../../../components/ui/StatCard';
import {
  IconTicketStack,
  IconCircleDot,
  IconClock,
  IconCheckCircle,
} from '../../../components/icons';

function ReportStatsGrid({ summary }) {
  const items = [
    {
      label: 'Total Tickets',
      value: summary.total,
      icon: IconTicketStack,
      variant: 'default',
    },
    {
      label: 'Open Tickets',
      value: summary.open,
      icon: IconCircleDot,
      variant: 'open',
      featured: true,
    },
    {
      label: 'In Progress',
      value: summary.inProgress,
      icon: IconClock,
      variant: 'progress',
    },
    {
      label: 'Closed Tickets',
      value: summary.closed,
      icon: IconCheckCircle,
      variant: 'resolved',
    },
    {
      label: 'High Priority',
      value: summary.highPriority,
      icon: IconCircleDot,
      variant: 'default',
    },
  ];

  return (
    <div className="reports-stats" role="region" aria-label="Report summary statistics">
      {items.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  );
}

export default ReportStatsGrid;
