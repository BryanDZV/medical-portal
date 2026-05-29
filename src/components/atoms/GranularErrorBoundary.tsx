"use client";

import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ZodError } from "zod";

// 1. Evita que un error local rompa todo el dashboard médico.
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  // ZOD  Intercepta errores de validación si la API envía datos que rompen el esquema.
  const isZodError = error instanceof ZodError;
  const safeError = error as { message?: string; status?: number };
  // SEGURIDAD (RBAC): Detecta errores 403 para proteger y ocultar datos a usuarios sin privilegios médicos.
  const isForbidden = safeError?.message?.includes("403") || safeError?.status === 403;

  let errorMessage = "Ha ocurrido un error inesperado al cargar este componente.";
  if (isZodError) {
    errorMessage = "Zod Validation Error: Los datos recibidos están corruptos o no cumplen el esquema.";
  } else if (isForbidden) {
    //rbac estas siglas quieren decir Role-Based Access Control, es un sistema de
    //  seguridad que restringe el acceso a recursos o datos según los roles o 
    // privilegios asignados a los usuarios.
    errorMessage = "RBAC Error: No tienes los privilegios médicos necesarios para ver este dato.";
  }

  return (
    <div role="alert" className="p-4 border-2 border-red-500 bg-red-50 rounded-md m-2">
      <h2 className="text-lg font-bold text-red-700">Contenido no disponible</h2>
      <p className="text-sm text-red-600 my-2 font-mono">{errorMessage}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Reintentar carga
      </button>
    </div>
  );
}

interface GranularErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<FallbackProps>;
}

// Protege los componentes hijos delegando el manejo de errores.
export function GranularErrorBoundary({ children, fallback }: GranularErrorBoundaryProps) {
  // ZERO PROP DRILLING: Consumimos el reset global de React Query para reintentar peticiones caídas sin pasar props.
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={fallback ?? ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}