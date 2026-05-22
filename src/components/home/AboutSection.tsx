export function AboutSection() {
  return (
    <section id="about" className="px-6 py-20 bg-white">
      <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-blue-600" tabIndex={0}>
            Sobre nosotros
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900" tabIndex={0}>
            Portal médico para pacientes y profesionales
          </h2>

          <p className="mt-5 text-slate-600 leading-7" tabIndex={0}>
            En Salud Conecta entendemos que detrás de cada consulta hay una
            persona que busca bienestar y tranquilidad. Nacimos con la misión de
            humanizar la medicina, combinando la calidez en el trato con la
            excelencia clínica. Nuestro equipo de profesionales está
            comprometido con ofrecer una atención integral y personalizada para
            cada etapa de tu vida. No solo tratamos síntomas; cuidamos de
            personas. Porque para nosotros, tu salud es lo primero, pero tu
            bienestar emocional es nuestro motor diario
          </p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-8" tabIndex={0}>
          <h3 className="text-xl font-semibold text-slate-900">
            Objetivo principal
          </h3>

          <p className="mt-4 text-slate-600 leading-7">
            Centralizar la gestión de citas y datos médicos gracias a nuestra
            plataforma. Podras realizar las citas médicas que necesites de
            manera rápida y segura.
          </p>
        </div>
      </div>
    </section>
  );
}
