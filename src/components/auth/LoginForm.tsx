// src/components/auth/LoginForm.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { validateLoginForm, type LoginErrors } from "@/lib/auth-validation";

export function LoginForm() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const login = useAuthStore((state) => state.login);
  const failedAttempts = useAuthStore((state) => state.failedAttempts);
  const isBlocked = useAuthStore((state) => state.isBlocked);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<LoginErrors>({});

  useEffect(() => {
    if (hasHydrated && user) {
      router.push("/dashboard");
    }
  }, [hasHydrated, user, router]);

  // Evitamos retornar null para que el servidor envíe el HTML del formulario (SSR).
  // Esto mejora drásticamente métricas como LCP (Largest Contentful Paint) y FCP en Lighthouse.
  const isFormDisabled = hasHydrated ? isBlocked : false;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isBlocked) {
      setErrors({
        general: "Cuenta bloqueada temporalmente por demasiados intentos",
      });
      return;
    }

    const validationErrors = validateLoginForm(email, password);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const isValidLogin = login(email, password);

    if (!isValidLogin) {
      setErrors({
        general: `Credenciales incorrectas. Intentos fallidos: ${
          failedAttempts + 1
        }/3`,
      });
      return;
    }

    setErrors({});
    router.push("/dashboard");
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <Link
        href="/"
        className="absolute flex items-center left-6 top-6 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Volver al inicio
      </Link>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-3xl font-bold text-slate-900">Iniciar sesión</h1>

        <p className="mt-2 text-slate-600">Accede con tus credenciales.</p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              disabled={isFormDisabled}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrors({});
              }}
              placeholder="doctor@clinic.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 disabled:bg-slate-200"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              disabled={isFormDisabled}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors({});
              }}
              placeholder="********"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 disabled:bg-slate-200"
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600">
              {errors.general}
            </p>
          )}

          <button
            type="submit"
            disabled={isFormDisabled}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            Acceder
          </button>
        </div>
      </form>
    </section>
  );
}
