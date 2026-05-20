"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export function ButtonCloseSession() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="">
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-xl bg-slate-900 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-lg sm:px-3 sm:py-2 sm:text-xs md:text-sm"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
