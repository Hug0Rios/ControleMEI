import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <section className="mx-auto flex max-w-5xl flex-col gap-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#172554]">
          Meu MEI Brasil
        </p>
        <h1 className="max-w-2xl text-4xl font-bold">Organize sua rotina de MEI em um só lugar.</h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Base inicial do painel para faturamento, despesas, notas, DAS e relatórios.
        </p>
        <div>
          <Link
            to="/app/dashboard"
            className="inline-flex rounded-md bg-[#172554] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#172554]"
          >
            Acessar dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
