"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/atoms/Button";

export function HomeAuthActions() {
  const { status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (status === "authenticated") {
    return (
      <div className="flex flex-row flex-wrap items-center justify-end gap-2 sm:gap-3">
        <Button
          asLink="/dashboard"
          prefetch={false}
          size="sm"
          className="inline-flex w-auto items-center justify-center whitespace-nowrap px-3 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-sm"
        >
          <span className="sm:hidden">Dashboard</span>
          <span className="hidden sm:inline">Ir al dashboard</span>
        </Button>
        <Button
          variant="secondary"
          onClick={() => signOut({ callbackUrl: "/" })}
          size="sm"
          className="inline-flex w-auto items-center justify-center whitespace-nowrap px-3 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-sm"
        >
          Cerrar sesión
        </Button>
      </div>
    );
  }

  return (
    <Button
      asLink="/login"
      prefetch={false}
      size="sm"
      className="inline-flex w-auto items-center justify-center whitespace-nowrap px-3 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-sm"
    >
      Acceder
    </Button>
  );
}