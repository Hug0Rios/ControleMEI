import { Card } from '../../../components/ui/Card';

export function DeclaracaoAnualVisaoGeral() {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Declaração Anual</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Visão geral da declaração anual do MEI, com os principais indicadores e status.
      </p>
    </Card>
  );
}