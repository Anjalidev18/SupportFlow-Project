import Ticket from '../models/Ticket.js';

const STATUS_LABELS = {
  open: 'Open',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatDisplayId(id) {
  return `SF-${String(id).slice(-4).toUpperCase()}`;
}

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

function computeTrend(current, previous, sentimentWhenDown = 'negative') {
  if (previous === 0 && current === 0) return null;

  if (previous === 0) {
    return { value: 100, direction: 'up', sentiment: 'neutral' };
  }

  const change = Math.round((Math.abs(current - previous) / previous) * 100);
  const direction = current >= previous ? 'up' : 'down';
  let sentiment = 'neutral';

  if (direction === 'up') {
    sentiment = sentimentWhenDown === 'negative' ? 'negative' : 'positive';
  } else {
    sentiment = sentimentWhenDown;
  }

  return { value: change, direction, sentiment };
}

async function buildTrends() {
  const now = new Date();
  const currentStart = new Date(now);
  currentStart.setDate(currentStart.getDate() - 7);

  const previousStart = new Date(now);
  previousStart.setDate(previousStart.getDate() - 14);
  const previousEnd = new Date(currentStart);
  previousEnd.setMilliseconds(previousEnd.getMilliseconds() - 1);

  const [
    total,
    open,
    inProgress,
    resolved,
    totalPrev,
    openPrev,
    inProgressPrev,
    resolvedPrev,
  ] = await Promise.all([
    Ticket.countDocuments({ createdAt: { $gte: currentStart } }),
    Ticket.countDocuments({ status: 'open', createdAt: { $gte: currentStart } }),
    Ticket.countDocuments({ status: 'in_progress', createdAt: { $gte: currentStart } }),
    Ticket.countDocuments({ status: 'resolved', createdAt: { $gte: currentStart } }),
    Ticket.countDocuments({ createdAt: { $gte: previousStart, $lte: previousEnd } }),
    Ticket.countDocuments({ status: 'open', createdAt: { $gte: previousStart, $lte: previousEnd } }),
    Ticket.countDocuments({
      status: 'in_progress',
      createdAt: { $gte: previousStart, $lte: previousEnd },
    }),
    Ticket.countDocuments({
      status: 'resolved',
      createdAt: { $gte: previousStart, $lte: previousEnd },
    }),
  ]);

  const trends = {};

  const totalTrend = computeTrend(total, totalPrev, 'neutral');
  if (totalTrend) trends.total = totalTrend;

  const openTrend = computeTrend(open, openPrev, 'positive');
  if (openTrend) trends.open = openTrend;

  const inProgressTrend = computeTrend(inProgress, inProgressPrev, 'neutral');
  if (inProgressTrend) trends.inProgress = inProgressTrend;

  const resolvedTrend = computeTrend(resolved, resolvedPrev, 'positive');
  if (resolvedTrend) trends.resolved = resolvedTrend;

  return trends;
}

async function buildStats() {
  const [total, open, inProgress, resolved, trends] = await Promise.all([
    Ticket.countDocuments(),
    Ticket.countDocuments({ status: 'open' }),
    Ticket.countDocuments({ status: 'in_progress' }),
    Ticket.countDocuments({ status: 'resolved' }),
    buildTrends(),
  ]);

  return { total, open, inProgress, resolved, trends };
}

async function buildStatusOverview(total) {
  if (total === 0) {
    return Object.entries(STATUS_LABELS).map(([status, label]) => ({
      status,
      label,
      count: 0,
      percentage: 0,
    }));
  }

  const statuses = Object.keys(STATUS_LABELS);
  const counts = await Promise.all(
    statuses.map((status) => Ticket.countDocuments({ status }))
  );

  return statuses.map((status, index) => ({
    status,
    label: STATUS_LABELS[status],
    count: counts[index],
    percentage: Math.round((counts[index] / total) * 100),
  }));
}

async function buildVolumeChartData() {
  const days = [];

  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date);
  }

  const results = await Promise.all(
    days.map(async (date) => {
      const start = startOfDay(date);
      const end = endOfDay(date);

      const [created, resolved] = await Promise.all([
        Ticket.countDocuments({ createdAt: { $gte: start, $lte: end } }),
        Ticket.countDocuments({
          status: 'resolved',
          updatedAt: { $gte: start, $lte: end },
        }),
      ]);

      return {
        label: DAY_LABELS[date.getDay()],
        created,
        resolved,
      };
    })
  );

  return results;
}

function mapRecentTicket(ticket) {
  const id = ticket._id.toString();

  return {
    id,
    title: ticket.title,
    status: ticket.status,
    priority: ticket.priority,
    assignee: ticket.createdBy?.name ?? null,
    customer: null,
    createdAt: ticket.createdAt.toISOString(),
  };
}

function mapActivityItem(ticket) {
  const id = ticket._id.toString();

  return {
    id: `activity-${id}`,
    actor: ticket.createdBy?.name ?? 'Unknown',
    action: 'created',
    target: formatDisplayId(id),
    targetTitle: ticket.title,
    timestamp: ticket.createdAt.toISOString(),
  };
}

export async function getDashboardData() {
  const [stats, recentTicketDocs, total] = await Promise.all([
    buildStats(),
    Ticket.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .populate('createdBy', 'name')
      .lean(),
    Ticket.countDocuments(),
  ]);

  const [statusOverview, volumeChartData] = await Promise.all([
    buildStatusOverview(total),
    buildVolumeChartData(),
  ]);

  const recentTickets = recentTicketDocs.slice(0, 6).map(mapRecentTicket);
  const activityFeed = recentTicketDocs.map(mapActivityItem);

  return {
    stats,
    recentTickets,
    activityFeed,
    statusOverview,
    volumeChartData,
  };
}
