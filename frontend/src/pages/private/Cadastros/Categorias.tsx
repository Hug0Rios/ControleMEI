import { Card } from '../../../components/ui/Card';

export function Categorias() {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Categorias</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Organização de receitas, despesas e lançamentos por categoria.
      </p>
    </Card>
  );
}
