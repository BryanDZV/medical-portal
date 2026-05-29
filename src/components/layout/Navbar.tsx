import Link from "next/link";

const criticalRoutes = [
  { href: "/", label: "Inicio" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/login", label: "Acceso" },
];

export function Navbar() {
  return (
    <nav className="flex items-center gap-4">
      {criticalRoutes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          prefetch={false}
          className="text-sm font-medium text-muted hover:text-primary"
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
