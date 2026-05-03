import { StatusBadge } from './StatusBadge';

export type DataTableRow = {
  id: number;
  description: string;
  category: string;
  date: string;
  amount: string;
  status: string;
};

type DataTableProps = {
  rows: DataTableRow[];
};

export function DataTable({ rows }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3 font-semibold">Descricao</th>
            <th className="px-4 py-3 font-semibold">Categoria</th>
            <th className="px-4 py-3 font-semibold">Data</th>
            <th className="px-4 py-3 font-semibold">Valor</th>
            <th className="px-4 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map((row) => (
            <tr key={row.id} className="text-slate-700 dark:text-slate-200">
              <td className="px-4 py-4 font-medium text-slate-950 dark:text-white">
                {row.description}
              </td>
              <td className="px-4 py-4">{row.category}</td>
              <td className="px-4 py-4">{row.date}</td>
              <td className="px-4 py-4 font-semibold">{row.amount}</td>
              <td className="px-4 py-4">
                <StatusBadge label={row.status} tone="info" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
