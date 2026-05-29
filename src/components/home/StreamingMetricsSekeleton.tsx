import { Container } from "@/components/atoms/Container";

export function StreamingMetricsSkeleton() {
  return (
    <section className="bg-slate-50 py-16" aria-label="Cargando métricas">
      <Container>
        <div className="mb-10 max-w-3xl animate-pulse">
          <div className="h-4 w-44 rounded bg-slate-200" />
          <div className="mt-4 h-10 w-72 rounded bg-slate-200" />
        </div>

        <div className="flex gap-4 overflow-hidden pb-4 md:grid md:grid-cols-3 md:pb-0">
          {[1, 2, 3].map((item) => (
            <article
              key={item}
              className="w-[85vw] max-w-[320px] shrink-0 animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:w-auto md:max-w-none"
            >
              <div className="mx-auto mb-5 h-8 w-36 rounded bg-slate-200" />
              <div className="mx-auto mb-5 h-32 w-32 sm:h-40 sm:w-40 lg:h-52 lg:w-52 rounded-full bg-slate-200" />
              <div className="mx-auto h-4 w-44 rounded bg-slate-200" />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
