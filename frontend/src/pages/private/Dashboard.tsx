import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { AlertCard } from '../../components/ui/AlertCard';
import { ChartCard } from '../../components/ui/ChartCard';
import { MetricCard } from '../../components/ui/MetricCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { getDashboardData } from '../../services/dashboard.service';

const dashboardData = getDashboardData();

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

export function Dashboard() {
  const {
    metrics,
    monthlyRevenue,
    meiLimit,
    cashFlow,
    cashFlowSummary,
    dueItems,
    invoiceSummary,
    alerts,
  } = dashboardData;

  const limitChartData = [
    { name: 'Utilizado', value: meiLimit.usedPercent },
    { name: 'Disponivel', value: 100 - meiLimit.usedPercent },
  ];

  return (
    <div className="space-y-3">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            description={metric.description}
            icon={metric.icon}
            tone={metric.tone}
            progress={metric.progress}
          />
        ))}
      </section>

      <section className="grid gap-3 xl:grid-cols-[1.15fr_0.75fr_1fr]">
        <ChartCard
          title="Faturamento"
          action={
            <button
              type="button"
              className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              Anual
            </button>
          }
        >
          <div className="h-[225px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyRevenue} margin={{ left: -18, right: 8, top: 4, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-800"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: 'currentColor' }}
                  className="text-slate-500 dark:text-slate-400"
                />
                <YAxis
                  tickFormatter={(value) => `R$ ${Number(value) / 1000}k`}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: 'currentColor' }}
                  className="text-slate-500 dark:text-slate-400"
                />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar
                  dataKey="revenue"
                  name="Faturamento Mensal"
                  fill="#2f7cf6"
                  radius={[3, 3, 0, 0]}
                  barSize={18}
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  name="Média Mensal"
                  stroke="#94a3b8"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Limite MEI">
          <div className="grid min-h-[225px] grid-cols-1 items-center gap-2 sm:h-[225px] sm:grid-cols-[1fr_0.95fr]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={limitChartData}
                  dataKey="value"
                  innerRadius="64%"
                  outerRadius="86%"
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={2}
                >
                  <Cell fill="#2f7cf6" />
                  <Cell fill="#e2e8f0" />
                </Pie>
                <text
                  x="50%"
                  y="47%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-950 text-xl font-bold dark:fill-white"
                >
                  {meiLimit.usedPercent.toLocaleString('pt-BR')}%
                </text>
                <text
                  x="50%"
                  y="59%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-500 text-xs dark:fill-slate-400"
                >
                  Utilizado
                </text>
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Total utilizado</span>
                <strong className="block text-slate-950 dark:text-white">{meiLimit.used}</strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Limite anual</span>
                <strong className="block text-slate-950 dark:text-white">{meiLimit.annualLimit}</strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Disponível</span>
                <strong className="block text-slate-950 dark:text-white">{meiLimit.available}</strong>
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Fluxo de Caixa (Mes)">
          <div className="grid min-h-[225px] grid-cols-1 gap-2 sm:h-[225px] sm:grid-cols-[0.48fr_1fr]">
            <div className="space-y-3 pt-4 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Entradas</span>
                <strong className="block text-emerald-600 dark:text-emerald-300">
                  {cashFlowSummary.income}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Saídas</span>
                <strong className="block text-rose-600 dark:text-rose-300">
                  {cashFlowSummary.expense}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Saldo</span>
                <strong className="block text-blue-600 dark:text-blue-300">
                  {cashFlowSummary.balance}
                </strong>
              </div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cashFlow} margin={{ left: -28, right: 4, top: 10, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-800"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: 'currentColor' }}
                  className="text-slate-500 dark:text-slate-400"
                />
                <YAxis
                  tickFormatter={(value) => `R$ ${Number(value) / 1000}k`}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: 'currentColor' }}
                  className="text-slate-500 dark:text-slate-400"
                />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line
                  type="monotone"
                  dataKey="income"
                  name="Entradas"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  name="Saídas"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      <section className="grid gap-3 xl:grid-cols-[1.15fr_0.75fr_1fr]">
        <ChartCard title="Próximos Vencimentos">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {dueItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                  DAS
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-950 dark:text-white">{item.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.dueDate}</p>
                </div>
                <strong className="text-sm text-slate-950 dark:text-white">{item.amount}</strong>
                <StatusBadge label={item.status} tone={item.tone} />
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Notas Fiscais (Mes)">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {invoiceSummary.map((item) => (
              <div key={item.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 py-4 first:pt-1 last:pb-1">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.label}</span>
                <strong className="text-sm text-slate-950 dark:text-white">{item.quantity}</strong>
                <span className="text-sm text-slate-700 dark:text-slate-300">{item.amount}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Avisos e Alertas">
          <div className="space-y-2">
            {alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                title={alert.title}
                message={alert.message}
                tone={alert.tone}
              />
            ))}
          </div>
        </ChartCard>
      </section>
    </div>
  );
}
