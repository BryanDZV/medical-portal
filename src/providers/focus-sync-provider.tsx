"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useMedicalRecordStore } from "@/store/useMedicalRecordStore";

interface FocusSyncProviderProps {
  children: ReactNode;
}

const FOCUS_SYNC_COOLDOWN_MS = 1500;

/**
 * Resincroniza el estado persistido cuando el usuario vuelve a la pestaña.
 * En este proyecto sin backend real, localStorage actúa como fuente compartida
 * entre refrescos o pestañas, por eso rehidratamos Zustand al recuperar foco.
 */
export function FocusSyncProvider({ children }: FocusSyncProviderProps) {
  const lastSyncAtRef = useRef(0);

  useEffect(() => {
    const syncPersistedStores = () => {
      if (document.visibilityState === "hidden") return;

      const now = Date.now();
      if (now - lastSyncAtRef.current < FOCUS_SYNC_COOLDOWN_MS) return;
      lastSyncAtRef.current = now;

      void useAuthStore.persist.rehydrate();
      void useAppointmentStore.persist.rehydrate();
      void useMedicalRecordStore.persist.rehydrate();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncPersistedStores();
      }
    };

    window.addEventListener("focus", syncPersistedStores);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", syncPersistedStores);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <>{children}</>;
}
