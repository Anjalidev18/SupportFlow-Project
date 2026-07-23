import Ticket from '../models/Ticket.js';
import {
  TICKET_STATUSES,
  TICKET_PRIORITIES,
  TICKET_STATUS_LABELS,
  TICKET_PRIORITY_LABELS,
} from '../constants/ticket.js';

const STATUS_LABELS = TICKET_STATUS_LABELS;
const PRIORITY_LABELS = TICKET_PRIORITY_LABELS;

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

function formatTrendLabel(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

async function buildSummary() {
  const [total, open, inProgress, closed, highPriority] = await Promise.all([
    Ticket.countDocuments(),
    Ticket.countDocuments({ status: 'open' }),
    Ticket.countDocuments({ status: 'in_progress' }),
    Ticket.countDocuments({ status: 'resolved' }),
    Ticket.countDocuments({ priority: 'high' }),
  ]);

  return { total, open, inProgress, closed, highPriority };
}

async function buildBreakdown(field, values, labels) {
  const total = await Ticket.countDocuments();

  if (total === 0) {
    return values.map((value) => ({
      key: value,
      label: labels[value],
      count: 0,
      percentage: 0,
    }));
  }

  const counts = await Promise.all(
    values.map((value) => Ticket.countDocuments({ [field]: value }))
  );

  return values.map((value, index) => ({
    key: value,
    label: labels[value],
    count: counts[index],
    percentage: Math.round((counts[index] / total) * 100),
  }));
}

async function buildCreationTrend(days = 14) {
  const results = [];

  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const start = startOfDay(date);
    const end = endOfDay(date);

    const count = await Ticket.countDocuments({
      createdAt: { $gte: start, $lte: end },
    });

    results.push({
      date: start.toISOString(),
      label: formatTrendLabel(date),
      count,
    });
  }

  return results;
}

export async function getReportsData() {
  const [summary, byStatus, byPriority, creationTrend] = await Promise.all([
    buildSummary(),
    buildBreakdown('status', TICKET_STATUSES, STATUS_LABELS),
    buildBreakdown('priority', TICKET_PRIORITIES, PRIORITY_LABELS),
    buildCreationTrend(14),
  ]);

  return {
    summary,
    byStatus,
    byPriority,
    creationTrend,
  };
}
