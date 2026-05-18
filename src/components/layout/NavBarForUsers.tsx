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
      <Container className="flex justify-between h-16 items-center">
        <Link href="/" className="text-xl font-bold text-sky-700 mt-1">
          <Image
            src={logoImg}
            width={150}
            height={150}
            alt="logonavbar"
          />
        </Link>

        <nav className="flex gap-4 text-sm font-medium md:flex">
          {showDashboardLink && (
            <Link
              href="/dashboard"
              prefetch={false}
              className="flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
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

          <ButtonCloseSession></ButtonCloseSession>
        </nav>
      </Container>
    </header >
  );
}
