/*
  Proxy de Next.js para autenticacion/autorizacion por roles (RBAC).
  Flujo:
  1) Deja pasar rutas publicas.
  2) En /login, si ya hay sesion valida, redirige a la home del rol.
  3) En rutas protegidas, exige cookie session_token.
  4) Valida el JWT y revisa acceso por rol.
*/

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  defaultRoleRoute,
  isPublicRoute,
  isRouteAllowedForRole,
} from "@/config/routes";
import type { Role } from "@/types/auth";

const createLoginUrl = (request: NextRequest, pathname: string) => {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set(
    "callbackUrl",
    `${pathname}${request.nextUrl.search}`,
  );
  return loginUrl;
};

const authSecret =
  process.env.NEXTAUTH_SECRET ?? process.env.JWT_SECRET_KEY ?? "medical-portal-dev-secret";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request, secret: authSecret });

  // 1. Manejo de rutas públicas
  if (isPublicRoute(pathname)) {
    // Si está en /login y tiene sesión válida, redirige a su home por rol
    if (token && pathname === "/login") {
      const role = token.role as Role | undefined;

      if (role && defaultRoleRoute[role]) {
        return NextResponse.redirect(new URL(defaultRoleRoute[role], request.url));
      }
    }

    return NextResponse.next();
  }

  // 2. Bloqueo si no hay token en ruta protegida
  if (!token) {
    return NextResponse.redirect(createLoginUrl(request, pathname));
  }

  // 3. Verificación de Autorización (RBAC)
  const role = token.role as Role | undefined;
  const hasAccess = role ? isRouteAllowedForRole(role, pathname) : false;

  if (!hasAccess) {
    return NextResponse.redirect(new URL("/acceso-denegado", request.url));
  }

  // 5. Todo correcto, permitir paso
  return NextResponse.next();
}

export const config = {
  // Excluye rutas estáticas, API auth, y otras que no necesitan este proxy
  matcher: [
    "/((?!api/auth|_next/image|_next/static|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
