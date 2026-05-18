// src/components/layout/Footer.tsx

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-950 px-6 py-10 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 text-center md:grid-cols-3 md:text-left">
        <div>
          <h2 className="text-xl font-bold text-white">Salud conecta</h2>
          <p className="mt-3 text-sm leading-6">
            Portal médico para gestionar citas, pacientes y acceso seguro según
            rol.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Navegación</h3>

          <nav className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-white" prefetch={false}>
              Inicio
            </Link>
            <Link href="/login" className="hover:text-white" prefetch={false}>
              Acceder
            </Link>
            <Link href="/dashboard" className="hover:text-white" prefetch={false}>
              Dashboard
            </Link>
            <Link href="/appointments" className="hover:text-white" prefetch={false}>
              Citas
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="font-semibold text-white">Contacto</h3>

          <div className="mt-3 space-y-2 text-sm">
            <p>Email: soporte@mediportal.com</p>
            <p>Teléfono: +34 600 000 000</p>
            <p>Horario: Lun - Vie, 09:00 - 18:00</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-slate-800 pt-6 text-center text-sm text-slate-300">
        © 2026 MediPortal. Todos los derechos reservados.
      </div>
    </footer>
  );
}
