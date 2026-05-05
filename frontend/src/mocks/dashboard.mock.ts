export type MetricTone = 'blue' | 'green' | 'red' | 'amber';
export type AlertTone = 'critical' | 'alert' | 'info' | 'success';
export type BadgeTone = 'danger' | 'info' | 'success';

export type DashboardMetric = {
  title: string;
  value: string;
  description: string;
  icon: string;
  tone: MetricTone;
  progress?: number;
};

export type MonthlyRevenue = {
  month: string;
  revenue: number;
  average: number;
};

export type CashFlowPoint = {
  day: string;
  income: number;
  expense: number;
};

export type MeiLimit = {
  usedPercent: number;
  used: string;
  annualLimit: string;
  available: string;
};

export type CashFlowSummary = {
  income: string;
  expense: string;
  balance: string;
};

export type DueItem = {
  id: number;
  title: string;
  dueDate: string;
  amount: string;
  status: string;
  tone: BadgeTone;
};

export type InvoiceSummary = {
  id: number;
  label: string;
  quantity: number;
  amount: string;
};

export type DashboardAlert = {
  id: number;
  title: string;
  message: string;
  tone: AlertTone;
};

export type DashboardMock = {
  metrics: DashboardMetric[];
  monthlyRevenue: MonthlyRevenue[];
  meiLimit: MeiLimit;
  cashFlow: CashFlowPoint[];
  cashFlowSummary: CashFlowSummary;
  dueItems: DueItem[];
  invoiceSummary: InvoiceSummary[];
  alerts: DashboardAlert[];
};

export const dashboardMock: DashboardMock = {
  metrics: [
    {
      title: 'Faturamento do Mês',
      value: 'R$ 8.750,00',
      description: '+12.5% vs mês anterior',
      icon: 'FM',
      tone: 'blue',
    },
    {
      title: 'Faturamento do Ano',
      value: 'R$ 42.350,00',
      description: '52.3% do limite anual',
      icon: 'FA',
      tone: 'blue',
      progress: 52.3,
    },
    {
      title: 'Limite MEI (Anual)',
      value: 'R$ 81.000,00',
      description: 'Limite disponível: R$ 38.650,00',
      icon: 'LM',
      tone: 'blue',
      progress: 52.3,
    },
    {
      title: 'Despesas do Mês',
      value: 'R$ 2.350,00',
      description: '-8.2% vs mês anterior',
      icon: 'DM',
      tone: 'red',
    },
    {
      title: 'Lucro do Mês',
      value: 'R$ 6.400,00',
      description: '+18.7% vs mês anterior',
      icon: 'LC',
      tone: 'green',
    },
    {
      title: 'DAS em Aberto',
      value: '1',
      description: 'Vencimento: 20/06/2024',
      icon: 'DA',
      tone: 'amber',
    },
  ],
  monthlyRevenue: [
    { month: 'Jan', revenue: 3850, average: 7200 },
    { month: 'Fev', revenue: 6900, average: 7200 },
    { month: 'Mar', revenue: 7600, average: 7200 },
    { month: 'Abr', revenue: 8400, average: 7200 },
    { month: 'Mai', revenue: 9100, average: 7200 },
    { month: 'Jun', revenue: 7350, average: 7200 },
    { month: 'Jul', revenue: 10700, average: 7200 },
    { month: 'Ago', revenue: 8750, average: 7200 },
    { month: 'Set', revenue: 0, average: 7200 },
    { month: 'Out', revenue: 0, average: 7200 },
    { month: 'Nov', revenue: 0, average: 7200 },
    { month: 'Dez', revenue: 0, average: 7200 },
  ],
  meiLimit: {
    usedPercent: 52.3,
    used: 'R$ 42.350,00',
    annualLimit: 'R$ 81.000,00',
    available: 'R$ 38.650,00',
  },
  cashFlow: [
    { day: '01/05', income: 280, expense: 160 },
    { day: '04/05', income: 560, expense: 210 },
    { day: '08/05', income: 620, expense: 190 },
    { day: '12/05', income: 910, expense: 320 },
    { day: '15/05', income: 1180, expense: 280 },
    { day: '18/05', income: 1040, expense: 360 },
    { day: '22/05', income: 1120, expense: 590 },
    { day: '26/05', income: 930, expense: 430 },
    { day: '31/05', income: 1210, expense: 640 },
  ],
  cashFlowSummary: {
    income: 'R$ 8.750,00',
    expense: 'R$ 2.350,00',
    balance: 'R$ 6.400,00',
  },
  dueItems: [
    {
      id: 1,
      title: 'DAS MEI - Maio/2024',
      dueDate: 'Vencimento: 20/06/2024',
      amount: 'R$ 70,60',
      status: 'Em aberto',
      tone: 'danger',
    },
    {
      id: 2,
      title: 'DAS MEI - Junho/2024',
      dueDate: 'Vencimento: 20/07/2024',
      amount: 'R$ 70,60',
      status: 'Pendente',
      tone: 'info',
    },
  ],
  invoiceSummary: [
    {
      id: 1,
      label: 'NFS-e Emitidas',
      quantity: 24,
      amount: 'R$ 8.250,00',
    },
    {
      id: 2,
      label: 'NF-e Recebidas',
      quantity: 3,
      amount: 'R$ 1.250,00',
    },
  ],
  alerts: [
    {
      id: 1,
      title: 'Atenção: Você utilizou 52,3% do seu limite anual.',
      message: 'Fique atento para não ultrapassar o limite de R$ 81.000,00.',
      tone: 'alert',
    },
    {
      id: 2,
      title: 'DAS em aberto',
      message: 'Você possui 1 DAS em aberto. Regularize para evitar multas.',
      tone: 'info',
    },
  ],
};
