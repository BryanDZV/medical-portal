import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AccessibilityPanel } from "@/components/accessibility/AccessibilityPanel";

/* Carga fuentes de forma optimizada con next/font*/
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
});


/* Metadata: mejora SEO, accesibilidad y arquitectura de la app */
export const metadata: Metadata = {
  title: "MedSync Pro",
  description:
    "Portal médico para gestión de pacientes, citas y expedientes clínicos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* Idioma: accesibilidad, lectores de pantalla, SEO, semántica correcta del documento*/
    <html 
      lang="es" 
      className={geistSans.variable} 
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <main className="flex-1">{children}</main>

        <AccessibilityPanel />
      </body>
    </html>
  );
}
