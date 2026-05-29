// src/components/auth/LoginForm.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { validateLoginForm, type LoginErrors } from "@/lib/auth-validation";

export function LoginForm() {
  const router = useRouter();

  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<LoginErrors>({});

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [router, status]);

  const isFormDisabled = isSubmitting || status === "loading";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateLoginForm(email, password);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    setIsSubmitting(false);

    if (!result || result.error) {
      setErrors({
        general: "Usuario y/o contraseña incorrectos.",
      });
      return;
    }

    setErrors({});
    router.replace(result.url ?? "/dashboard");
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
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="email"
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
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Contraseña
            </label>

            <input
              id="password"
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
