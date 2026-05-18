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

        <div className="grid gap-3 md:grid-cols-3">
          {metrics.map((metric) => (
            <article
              key={metric.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl pb-5 text-center  font-semibold text-slate-900">
                {metric.prefix} <span className="text-sky-700"></span>{" "}
              </h2>
              <div className="mx-auto mb-5 flex h-54 w-54 items-center justify-center rounded-full bg-sky-100 text-4xl font-black text-sky-800 shadow-inner">
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
