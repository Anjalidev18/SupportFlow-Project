import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import EmptyState from '../../../components/ui/EmptyState';
import { IconBarChart } from '../../../components/icons';

const STATUS_COLORS = {
  open: '#52525b',
  in_progress: '#1d4ed8',
  resolved: '#15803d',
};

const PRIORITY_COLORS = {
  low: '#71717a',
  medium: '#2563eb',
  high: '#ea580c',
};

function ChartCard({ title, description, children, isEmpty, emptyTitle, emptyDescription }) {
  return (
    <div className="reports-chart-card">
      <div className="reports-chart-card__header">
        <h2 className="reports-chart-card__title">{title}</h2>
        {description && <p className="reports-chart-card__description">{description}</p>}
      </div>
      {isEmpty ? (
        <EmptyState
          icon={<IconBarChart size={32} />}
          title={emptyTitle}
          description={emptyDescription}
        />
      ) : (
        <div className="reports-chart-card__chart">{children}</div>
      )}
    </div>
  );
}

export function StatusChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const chartData = data.filter((item) => item.count > 0);

  return (
    <ChartCard
      title="Tickets by Status"
      description="Distribution of tickets across workflow states"
      isEmpty={total === 0}
      emptyTitle="No status data"
      emptyDescription="Status breakdown will appear once tickets are created."
    >
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
          >
            {chartData.map((entry) => (
              <Cell key={entry.key} fill={STATUS_COLORS[entry.key] || '#71717a'} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [value, name]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function PriorityChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <ChartCard
      title="Tickets by Priority"
      description="How tickets are distributed by priority level"
      isEmpty={total === 0}
      emptyTitle="No priority data"
      emptyDescription="Priority breakdown will appear once tickets are created."
    >
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="count" name="Tickets" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.key} fill={PRIORITY_COLORS[entry.key] || '#71717a'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function CreationTrendChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <ChartCard
      title="Ticket Creation Trend"
      description="New tickets created over the last 14 days"
      isEmpty={total === 0}
      emptyTitle="No trend data"
      emptyDescription="Creation trends will appear once tickets are created."
    >
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            name="Tickets created"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
