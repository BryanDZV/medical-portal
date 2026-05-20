import { Container } from "@/components/atoms/Container";
import { Button } from "@/components/atoms/Button";
import { Header } from "../layout/Header";
import Image from "next/image";
import { HomeAuthActions } from "../layout/HomeAuthActions";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <Image
        src="/Header-image_1.webp"
        alt="Fondo del portal médico"
        fill
        quality={50}
        priority
        className="object-cover object-center -z-10"
        sizes="100vw"
      />
      <Header></Header>
      <div className="absolute inset-0 bg-white/65" />

      <Container className="relative z-10 flex min-h-screen items-center pt-16">
        <div className="max-w-2xl space-y-6 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-700">
            Portal médico digital
          </p>

          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            Gestiona tus citas médicas de forma simple y segura
          </h1> 

           <p className="text-lg text-slate-700">
            Plataforma para pacientes y médicos con acceso personalizado,
            gestión de citas e información clínica según rol.
          </p> 

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-start">
            <HomeAuthActions />
            <Button asLink="/#services" variant="secondary" prefetch={false}>Ver servicios</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
