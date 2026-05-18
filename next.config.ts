import type { NextConfig } from "next";
import withBundleAnalyzerFactory from "@next/bundle-analyzer";

const withBundleAnalyzer = withBundleAnalyzerFactory({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  images: {
    qualities: [20, 50, 75, 100],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          /* Mejora la seguridad frente a la ejecución segura del contenido */
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          /* Mejora la seguridad frente a clickjacking */
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          /* Mejora la seguridad frente al acceso innecesario a permisos del navegador */
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          /* Mejora la seguridad frente a la exposición de información sensible */
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          /* Mejora la seguridad frente a la optimización/control de peticiones DNS del navegador */
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
