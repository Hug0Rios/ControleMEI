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
import { Link } from 'react-router-dom';

import { AlertCard } from '../../components/ui/AlertCard';
import { ChartCard } from '../../components/ui/ChartCard';
import { MetricCard } from '../../components/ui/MetricCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { getDashboardData } from '../../services/dashboard.service';

const dashboardData = getDashboardData();

const cardActionClass =
  'rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-200';

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
    { name: 'Disponível', value: 100 - meiLimit.usedPercent },
  ];

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-300">
              Painel executivo
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">
              Visão geral do MEI
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Acompanhe faturamento, obrigações e alertas em uma única área de trabalho.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
              <span className="block text-slate-500 dark:text-slate-400">Mês</span>
              <strong className="text-slate-950 dark:text-white">Maio</strong>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
              <span className="block text-slate-500 dark:text-slate-400">DAS</span>
              <strong className="text-slate-950 dark:text-white">{dueItems.length}</strong>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
              <span className="block text-slate-500 dark:text-slate-400">Alertas</span>
              <strong className="text-slate-950 dark:text-white">{alerts.length}</strong>
            </div>
          </div>
        </div>
      </section>

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
            <Link
              to="/app/relatorios/anual"
              className={cardActionClass}
            >
              Anual
            </Link>
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

        <ChartCard
          title="Limite MEI"
          action={
            <Link
              to="/app/das/gerar"
              className={cardActionClass}
            >
              Gerar DAS
            </Link>
          }
        >
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

        <ChartCard
          title="Fluxo de Caixa (Mês)"
          action={
            <Link
              to="/app/financeiro/faturamento"
              className={cardActionClass}
            >
              Ver financeiro
            </Link>
          }
        >
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
              <Link
                key={item.id}
                to="/app/das/historico"
                className="flex items-center gap-3 rounded-lg px-2 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-800/60 first:pt-0 last:pb-0"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                  DAS
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-950 dark:text-white">{item.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.dueDate}</p>
                </div>
                <strong className="text-sm text-slate-950 dark:text-white">{item.amount}</strong>
                <StatusBadge label={item.status} tone={item.tone} />
              </Link>
            ))}
          </div>
        </ChartCard>

        <ChartCard
          title="Notas Fiscais (Mês)"
          action={
            <Link
              to="/app/notas/nfse"
              className={cardActionClass}
            >
              Abrir notas
            </Link>
          }
        >
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {invoiceSummary.map((item) => (
              <Link
                key={item.id}
                to={item.label.includes('NFS') ? '/app/notas/nfse' : '/app/notas/nfe'}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-lg px-2 py-4 transition hover:bg-slate-50 dark:hover:bg-slate-800/60 first:pt-1 last:pb-1"
              >
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.label}</span>
                <strong className="text-sm text-slate-950 dark:text-white">{item.quantity}</strong>
                <span className="text-sm text-slate-700 dark:text-slate-300">{item.amount}</span>
              </Link>
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
