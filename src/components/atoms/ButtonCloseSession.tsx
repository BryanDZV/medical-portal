"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export function ButtonCloseSession() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
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
