/*
 `jwtVerify` (de `jose`) y una `JWT_SECRET_KEY` desde
  `process.env` para validar la firma. Se devuelve el `payload`
  tipado como `MedicalJwtPayload` o `null` si la verificación falla.
Provee una función reutilizable para comprobar la sesión
  en el servidor (middleware o API routes) 

  Documentación y orígenes:
  - `jose` (JWT en Node/Browser): https://github.com/panva/jose
  - `jwtVerify` API: https://github.com/panva/jose#jwtverify
  - Manejo de secretos en Next.js: https://nextjs.org/docs/app/guides/environment-variables
*/

import { MedicalJwtPayload } from "@/types/auth";
import { isRole } from "@/types/auth";
import { jwtVerify } from "jose";

export async function verifySessionToken(
  token: string,
): Promise<MedicalJwtPayload | null> {
  try {
    const rawSecret = process.env.JWT_SECRET_KEY;

    if (!rawSecret) {
      console.error("JWT_SECRET_KEY no esta configurada.");
      return null;
    }

    const secretKey = new TextEncoder().encode(rawSecret);
    const { payload } = await jwtVerify(token, secretKey);

    if (typeof payload.userId !== "string") {
      return null;
    }

    if (!isRole(payload.role)) {
      return null;
    }

    return payload as MedicalJwtPayload;
  } catch (error) {
    //return null en caso de token inválido o expirado, sin lanzar excepción
    console.warn("Token inválido o expirado", error);
    return null;
  }
}
