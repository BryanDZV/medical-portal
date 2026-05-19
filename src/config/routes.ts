import { Role } from "@/types/auth";

/*

  Cómo se usa: El middleware (`proxy.ts`) y otros guards importan estas
  constantes para decidir redirecciones y comprobaciones de acceso.

  Documentación y orígenes:
  - RBAC overview (Auth0): https://auth0.com/docs/authorization/rbac
  - Gestión de rutas: https://nextjs.org/docs/routing/introduction
*/

// Rutas que no requieren autenticación
export const publicRoutes = [
  "/",
  "/login",
  "/recuperar-password",
  "/acceso-denegado",
];

// Ruta por defecto por rol tras autenticarse
export const defaultRoleRoute: Record<Role, string> = {
  admin: "/dashboard",
  doctor: "/dashboard",
  patient: "/dashboard",
};

// Diccionario de acceso basado en roles
export const roleRoutes: Record<Role, string[]> = {
  admin: [
    "/dashboard",
    "/dashboard/appointments",
    "/dashboard/patients",
    "/dashboard/request",
    "/dashboard/records",
  ],
  doctor: ["/dashboard", "/dashboard/appointments", "/dashboard/patients"],
  patient: ["/dashboard", "/dashboard/appointments", "/dashboard/request", "/dashboard/records"],
};

const matchesRoute = (path: string, route: string) => {
  if (route === "/") {
    return path === "/";
  }

  return path === route || path.startsWith(`${route}/`);
};

// Función para verificar si una ruta es pública
export const isPublicRoute = (path: string) => {
  return publicRoutes.some((route) => matchesRoute(path, route));
};
// Función para verificar si un rol tiene acceso a una ruta
export const isRouteAllowedForRole = (role: Role, path: string) => {
  return roleRoutes[role].some((route) => matchesRoute(path, route));
};
