import StatCard from '../ui/StatCard';
import { IconTicketStack, IconCircleDot, IconClock, IconCheckCircle } from '../icons';

function StatsGrid({ stats }) {
  const items = [
    {
      label: 'Open Tickets',
      value: stats.open,
      icon: IconCircleDot,
      trend: stats.trends?.open,
      variant: 'open',
      featured: true,
      href: '/tickets?status=open',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: IconClock,
      trend: stats.trends?.inProgress,
      variant: 'progress',
      href: '/tickets?status=in_progress',
    },
    {
      label: 'Resolved',
      value: stats.resolved,
      icon: IconCheckCircle,
      trend: stats.trends?.resolved,
      variant: 'resolved',
      href: '/tickets?status=resolved',
    },
    {
      label: 'Total Tickets',
      value: stats.total,
      icon: IconTicketStack,
      trend: stats.trends?.total,
      variant: 'default',
      href: '/tickets',
    },
  ];

  return (
    <div className="stats-grid" role="region" aria-label="Ticket statistics">
      {items.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  );
}

export default StatsGrid;
