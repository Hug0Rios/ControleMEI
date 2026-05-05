import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
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
  'rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#172554] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-200';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  // tenta extrair revenue e average dos dados do tooltip
  const revenuePoint = payload.find((p: any) => p.dataKey === 'revenue') || payload[0];
  const averagePoint = payload.find((p: any) => p.dataKey === 'average');

  return (
    <div className="max-w-xs rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mb-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</div>
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(Number(revenuePoint.value))}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Faturamento mensal</div>
        </div>
        {averagePoint && (
          <div className="text-right">
            <div className="text-lg font-medium text-slate-700 dark:text-slate-200">{formatCurrency(Number(averagePoint.value))}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Média mensal</div>
          </div>
        )}
      </div>
    </div>
  );
}

function CashFlowTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  const incomePoint = payload.find((p: any) => p.dataKey === 'income');
  const expensePoint = payload.find((p: any) => p.dataKey === 'expense');

  return (
    <div className="max-w-xs rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mb-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</div>
      <div className="flex flex-col gap-2">
        {incomePoint && (
          <div className="flex items-baseline justify-between">
            <div className="text-sm text-slate-500 dark:text-slate-400">Entradas</div>
            <div className="text-sm font-medium text-slate-900 dark:text-white">{formatCurrency(Number(incomePoint.value))}</div>
          </div>
        )}
        {expensePoint && (
          <div className="flex items-baseline justify-between">
            <div className="text-sm text-slate-500 dark:text-slate-400">Saídas</div>
            <div className="text-sm font-medium text-slate-900 dark:text-white">{formatCurrency(Number(expensePoint.value))}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function CircularProgress({ value, label }: { value: number; label: string }) {
  const clampedValue = Math.max(0, Math.min(100, value));
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (clampedValue / 100) * circumference;

  return (
    <div className="relative mx-auto h-[178px] w-[178px]">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          className="text-slate-200 dark:text-slate-800"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="text-[#172554] transition-all duration-500 dark:text-[#2f7cf6]"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <strong className="text-2xl font-bold text-[#172554] dark:text-white">
          {clampedValue.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%
        </strong>
        <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
      </div>
    </div>
  );
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

  const currentMonthLabel = new Intl.DateTimeFormat('pt-BR', { month: 'long' })
    .format(new Date())
    .replace(/^[a-z]/, (letter) => letter.toUpperCase());

  function formatCashFlowYAxis(value: number) {
    const num = Number(value);
    const absolute = Math.abs(num);

    if (num === 0) return '0';

    if (absolute > 999) {
      const thousands = Math.floor(absolute / 1000);
      return `${num < 0 ? '-' : ''}${thousands.toLocaleString('pt-BR')} mil`;
    }

    return num.toLocaleString('pt-BR');
  }

  function formatCashFlowDay(dayValue: string) {
    const day = Number(dayValue.split('/')[0]);
    return day.toString();
  }

  return (
    <div className="space-y-4">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            description={metric.description}
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
              to="/app/financeiro/faturamento"
              className={cardActionClass}
            >
              Ver financeiro
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
                  tickFormatter={(value) => {
                    const num = Number(value);
                    if (num === 0) return '0';
                    if (Math.abs(num) >= 1000) {
                      const k = num / 1000;
                      const formatted = Number.isInteger(k)
                        ? k.toLocaleString('pt-BR')
                        : k.toLocaleString('pt-BR', { maximumFractionDigits: 1 });
                      return `${formatted} mil`;
                    }
                    return formatCurrency(num);
                  }}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: 'currentColor' }}
                  className="text-slate-500 dark:text-slate-400"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="revenue"
                  name="Faturamento Mensal"
                  onTouchMoveCapture={() => {}}
                  fill="currentColor"
                  className="text-[#172554] dark:text-[#2f7cf6]"
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
            <CircularProgress value={meiLimit.usedPercent} label="Utilizado" />

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
          title={`Fluxo de Entradas e Saídas (${currentMonthLabel})`}
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
                  ticks={cashFlow.map((point) => point.day)}
                  interval={0}
                  tickFormatter={formatCashFlowDay}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: 'currentColor' }}
                  className="text-slate-500 dark:text-slate-400"
                />
                <YAxis
                  tickFormatter={formatCashFlowYAxis}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: 'currentColor' }}
                  className="text-slate-500 dark:text-slate-400"
                />
                <Tooltip content={<CashFlowTooltip />} />
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
          <div className="space-y-2">
            {dueItems.map((item) => (
              <Link
                key={item.id}
                to="/app/das/gerar"
                className="flex items-center gap-3 px-3 py-3 transition rounded-lg border border-slate-100 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800/60"
              >
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
          title={`Notas Fiscais (${currentMonthLabel})`}
        >
          <div className="space-y-2">
            {invoiceSummary.map((item) => (
              <Link
                key={item.id}
                to="/app/notas"
                className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-3 py-3 transition rounded-lg border border-slate-100 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800/60"
              >
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.label}
                  <p className="text-xs text-slate-500 dark:text-slate-400">{currentMonthLabel}</p>
                </span>
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
