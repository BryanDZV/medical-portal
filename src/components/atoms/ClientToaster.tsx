"use client";

import dynamic from "next/dynamic";

export const ClientToaster = dynamic(
  () => import("sonner").then((mod) => mod.Toaster),
  { ssr: false }
);