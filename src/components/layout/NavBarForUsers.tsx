import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { ButtonCloseSession } from "../atoms/ButtonCloseSession";
import Image from "next/image";
import logoImg from "@/assets/logo-remove.webp";

interface NavBarForUsersProps {
  showDashboardLink?: boolean;
}

export function NavBarForUsers({ showDashboardLink }: NavBarForUsersProps) {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-white/30">
      <Container className="flex h-auto flex-col gap-2 py-3 sm:h-16 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-xl font-bold text-sky-700 mt-1">
          <Image
            src={logoImg}
            width={180}
            height={180}
            alt="logonavbar"
            sizes="(min-width: 640px) 170px, 120px"
            className="h-14 w-auto object-contain origin-left scale-150 sm:h-16 sm:scale-200"
          />
        </Link>

        <nav className="flex w-full flex-wrap items-center justify-end gap-1.5 text-xs font-medium sm:w-auto sm:flex-nowrap sm:justify-start sm:gap-3">
          {showDashboardLink && (
            <Link
              href="/dashboard"
              prefetch={false}
              className="flex items-center rounded-xl border border-slate-300 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:px-3 sm:py-2 sm:text-xs md:text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="mr-3 h-5 w-5 hidden md:block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Volver al dashboard
            </Link>
          )}
          <Link href={"/"} prefetch={false} className="flex items-center left-6 top-6 rounded-xl border border-slate-300 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:px-3 sm:py-2 sm:text-xs md:text-sm">
            {/* <Image
                src="/arrow.png"
                alt=""
                width={20}
                height={20}
                className="mr-5 hidden md:block"
              /> */}

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-3 hidden md:block">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Volver al inicio
          </Link>

          <ButtonCloseSession></ButtonCloseSession>
        </nav>
      </Container>
    </header >
  );
}
