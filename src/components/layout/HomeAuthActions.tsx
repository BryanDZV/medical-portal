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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asLink="/dashboard" prefetch={false}>
          Ir al dashboard
        </Button>
        <Button
          variant="secondary"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Cerrar sesión
        </Button>
      </div>
    );
  }

  return <Button asLink="/login" prefetch={false}>Acceder</Button>;
}