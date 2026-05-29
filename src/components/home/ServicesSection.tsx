const services = [
  {
    title: "Gestión de citas",
    description:
      "Reserva, confirma o cancela citas médicas desde nuetro portal. Podrás escoger la especialidad y concretar tus fechas.",
  },
  {
    title: "Panel para pacientes",
    description:
      "Visualiza tus citas y datos básicos de forma sencilla y en cualquier momento. También podrás descargar tus expedientes médicos que dejan a tu disposición nuestros profesionales.",
  },
  {
    title: "Panel para médicos",
    description:
      "Consulta pacientes, gestiona las citas y deja a mano las recetas medicas en un clic.",
  },
];

export function ServicesSection() {
  return (
    <section id="portal" className="px-6 py-20 bg-slate-100">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase text-blue-600" tabIndex={0}>
          Adaptate a la comodidad
        </p>

        <h2 className="mt-3 text-4xl font-bold text-slate-900" tabIndex={0}>
          Qué permite hacer la plataforma
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl bg-white p-6 shadow-sm"
              tabIndex={0}
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {service.title}
              </h3>

              <p className="mt-3 text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
