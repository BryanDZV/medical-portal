import { Container } from "@/components/atoms/Container";
import { mockDoctors } from "@/data/mockDoctors";

const STATIC_FACILITIES = 10;

interface HomeMetricsSectionProps {
  initialPatientsAttended?: number;
  initialProfessionalSpecialties?: number;
  initialFacilities?: number;
}

export function HomeMetricsSection({
  initialPatientsAttended = 0,
  initialProfessionalSpecialties,
  initialFacilities = STATIC_FACILITIES,
}: HomeMetricsSectionProps) {
  const attendedPatients = initialPatientsAttended;

  const professionalSpecialties =
    initialProfessionalSpecialties ??
    new Set(
      mockDoctors.map((doctor) => doctor.specialty.trim()).filter(Boolean),
    ).size;

  const metrics = [
    {
      value: attendedPatients,
      title: "pacientes atendidos",
      prefix: "Más de",
      description: "Expedientes médicos.",
    },
    {
      value: professionalSpecialties,
      title: "profesionales de la salud",
      prefix: "Contamos con",
      description: "Especialidades únicas disponibles en el equipo médico.",
    },
    {
      value: initialFacilities,
      title: "instalaciones",
      prefix: "Disponemos de",
      description: "Instalaciones médicas a alcance del paciente.",
    },
  ];

  return (
    <section className="bg-slate-50 py-16">
      <Container>
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            Métricas del centro
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Impacto sanitario
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {metrics.map((metric) => (
            <article
              key={metric.title}
              className="w-[85vw] max-w-[320px] shrink-0 snap-center rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:w-auto md:max-w-none"
            >
              <h3 className="text-xl sm:text-2xl pb-4 sm:pb-5 text-center font-semibold text-slate-900">
                {metric.prefix}
              </h3>
              <div className="mx-auto mb-5 flex h-32 w-32 sm:h-40 sm:w-40 lg:h-52 lg:w-52 items-center justify-center rounded-full bg-sky-100 text-3xl sm:text-4xl lg:text-5xl font-black text-sky-800 shadow-inner">
                {metric.value}
              </div>
              <p className="mt-3 text-sm text-center leading-6 text-slate-600">
                {metric.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
