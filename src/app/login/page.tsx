import { Suspense } from "react";
import { StreamingLoginSection } from "@/components/auth/StreamingLoginSection";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-100" />}>
      <StreamingLoginSection />
    </Suspense>
  );
}
