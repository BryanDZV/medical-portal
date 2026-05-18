import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/atoms/Container";
import { Button } from "@/components/atoms/Button";
import logoImg from "@/assets/logo-remove.webp";

export function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white/95 border-b border-white/30">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold text-sky-700 mt-1">
          <Image
            src={logoImg}
            alt="Logo del Portal Médico"
            width={200}
            height={200}
            sizes="(min-width: 768px) 160px, 120px"
            className="h-16 w-auto object-contain scale-200 origin-left"
          />
        </Link>

        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <Link href="/#about" prefetch={false}>Quiénes somos</Link>
          <Link href="/#portal" prefetch={false}>Nuestra plataforma</Link>
          <Link href="/#services" prefetch={false}>Servicios</Link>
          <Link href="/#articles" prefetch={false}>Artículos</Link>
          <Link href="/#appointments" prefetch={false}>Instrucciones para citas</Link>

        </nav>

        <Button asLink="/login" prefetch={false}>Acceder</Button>
      </Container>
    </header>
  );
}
