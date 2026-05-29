"use client";

import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";
import * as React from "react";

const ReactQueryDevtools =
  process.env.NODE_ENV === "development"
    ? dynamic(
        () =>
          import("@tanstack/react-query-devtools").then(
            (module) => module.ReactQueryDevtools,
          ),
        { ssr: false },
      )
    : null;

// 1. Fábrica de clientes: Crea una instancia limpia y configurada
function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (error.name !== "AbortError") {
          console.error(`[Query Error] Clave: ${query.queryKey}`);
          console.error(`Detalle: ${error.message}`);
          // TODO: Enviar a DataDog / Sentry
        }
      },
    }),
    mutationCache: new MutationCache({
      // Intercepta errores en mutaciones (escrituras)
      //mutaciones quiere decir cualquier acción que modifique datos, como crear, actualizar o eliminar registros en la base de datos
      onError: (error) => {
        // Intercepta fallos al intentar guardar/modificar datos
        console.error(`[Mutation Error] Crítico: Fallo al escribir en la BD.`);
        console.error(`Detalle: ${error.message}`);
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutos de frescura
        refetchOnWindowFocus: true, // Refetch inteligente: solo revalida al volver a foco si la query ya está stale
        retry: 2,
        // Resiliencia: Exponential Backoff
        //proteccion hacia el servidor
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        // Prevención: No reintentar escrituras para evitar duplicidad de transacciones
        retry: 0,
      },
    },
  });
}

// 2. Singleton para el cliente en el navegador
//hace que el cliente se comparta en toda la app cuando se ejecuta en el navegador,
//  pero cada petición al servidor obtiene uno nuevo (evitando fugas de datos entre usuarios)
let browserQueryClient: QueryClient | undefined = undefined;

// 3. Patrón de inicialización segura para SSR + Cliente
//en servidor nuevo cliente cada vez, en navegador reutiliza el mismo
function getQueryClient() {
  if (typeof window === "undefined") {
    // Si estamos en el servidor (Node.js), SIEMPRE creamos uno nuevo.
    // Esto previene que los datos de un paciente se filtren a otro.
    return makeQueryClient();
  } else {
    // Si estamos en el navegador, reutilizamos el mismo cliente siempre.
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Obtenemos el cliente de forma segura dependiendo del entorno
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Herramienta visual inyectada solo en desarrollo. En producción se auto-elimina */}
      {ReactQueryDevtools ? (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      ) : null}
    </QueryClientProvider>
  );
}
