// src/components/layout/Footer.tsx

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-950 px-4 py-8 text-slate-200 sm:px-6 sm:py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
        <div className="max-w-md lg:max-w-sm">
          <h2 className="text-xl font-bold text-white">Salud conecta</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Portal médico para gestionar citas, pacientes y acceso seguro según
            rol.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-white" tabIndex={0}>Navegación</h3>

          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm lg:justify-start">
            <Link href="/" className="transition-colors hover:text-white" prefetch={false}>
              Inicio
            </Link>
            <Link href="/login" className="transition-colors hover:text-white" prefetch={false}>
              Acceder
            </Link>
            <Link href="/dashboard" className="transition-colors hover:text-white" prefetch={false}>
              Dashboard
            </Link>
            <Link href="/appointments" className="transition-colors hover:text-white" prefetch={false}>
              Citas
            </Link>
          </nav>
        </div>

        <div className="flex flex-col gap-3" tabIndex={0}>
          <h3 className="font-semibold text-white">Contacto</h3>

          <div className="space-y-2 text-sm text-slate-300">
            <p>Email: soporte@mediportal.com</p>
            <p>Teléfono: +34 600 000 000</p>
            <p>Horario: Lun - Vie, 09:00 - 18:00</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-slate-800 pt-5 text-center text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p>© 2026 MediPortal. Todos los derechos reservados.</p>
        <p className="text-slate-300">Citas, pacientes y acceso seguro en un solo lugar.</p>
      </div>
    </footer>
  );
}
