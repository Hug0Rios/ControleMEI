import { Card } from '../../../components/ui/Card';

export function DeclaracaoAnualDados() {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Dados</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Cadastro e conferência dos dados usados para a declaração anual.
      </p>
    </Card>
  );
}