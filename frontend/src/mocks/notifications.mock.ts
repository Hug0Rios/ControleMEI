export type NotificationType = 'alert' | 'info' | 'success';

export type DashboardNotification = {
  id: number;
  title: string;
  description: string;
  type: NotificationType;
  time: string;
};

export const notificationsMock: DashboardNotification[] = [
  {
    id: 1,
    title: 'Você atingiu 52,3% do limite anual',
    description: 'Acompanhe o faturamento para manter margem até o fim do ano.',
    type: 'alert',
    time: 'Agora',
  },
  {
    id: 2,
    title: 'DAS de Maio/2024 está em aberto',
    description: 'O vencimento está previsto para 20/06/2024.',
    type: 'info',
    time: '2h',
  },
  {
    id: 3,
    title: '2 notas fiscais importadas este mês',
    description: 'As notas já estão disponíveis no resumo mensal.',
    type: 'success',
    time: 'Hoje',
  },
];
