import dynamic from "next/dynamic";

// Importación dinámica para separar el JS del cliente y evitar bloquear la renderización principal.
const LoginForm = dynamic(() => import("@/components/auth/LoginForm").then((mod) => mod.LoginForm));

export function StreamingLoginSection() {
  return <LoginForm />;
}
