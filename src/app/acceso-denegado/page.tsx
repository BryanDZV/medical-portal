import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";

export const dynamic = "force-dynamic";

export default function AccesoDenegadoPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.25),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_28%),linear-gradient(180deg,#0f172a_0%,#020617_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[56px_56px] opacity-30" />

      <Container className="relative flex min-h-screen items-center py-10">
        <section className="mx-auto grid w-full max-w-5xl gap-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md md:grid-cols-[1.1fr_0.9fr] md:p-10 lg:p-12">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              Acceso restringido
            </div>

            <h1 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              No puedes ver esta página.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Puede que no tengas acceso a esta parte. Vuelve al panel o regresa al inicio.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asLink="/dashboard" prefetch={false}>
                Ir al panel
              </Button>
              <Button asLink="/" prefetch={false} variant="secondary">
                Volver al inicio
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-red-400 via-sky-400 to-blue-500" />
            <div className="flex h-full flex-col justify-between gap-8">
              <div>
                <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-4 text-red-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-14 w-14"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v4m0 4h.01M10.29 3.86l-8.5 14.75A2 2 0 0 0 3.5 21h17a2 2 0 0 0 1.71-2.39l-8.5-14.75a2 2 0 0 0-3.42 0Z"
                    />
                  </svg>
                </div>

                <h2 className="text-2xl font-semibold text-white">
                  Acceso protegido
                </h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-300 sm:text-base">
                  Esta página solo se muestra a quienes tienen acceso. Si no es tu caso, vuelve atrás.
                </p>
              </div>

              <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">Estado</p>
                  <p className="mt-1">Sin acceso a esta página.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">Qué hacer</p>
                  <p className="mt-1">Ir al panel o volver al inicio.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}