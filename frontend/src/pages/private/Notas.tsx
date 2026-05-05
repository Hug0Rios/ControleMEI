import { Card } from '../../components/ui/Card';

export function Notas() {
  return (
    <Card>
      <h2 className="text-lg font-semibold">Notas Fiscais</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Central de emissão e histórico de notas fiscais.
      </p>
    </Card>
  );
}
