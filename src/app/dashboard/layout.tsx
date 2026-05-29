import { QueryProvider } from "@/providers/query-provider";
import { FocusSyncProvider } from "@/providers/focus-sync-provider";
import { ClientToaster } from "@/components/atoms/ClientToaster";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <FocusSyncProvider>
        <div className="flex-1">{children}</div>
        <ClientToaster
          position="top-right"
          richColors
          closeButton
        />
      </FocusSyncProvider>
    </QueryProvider>
  );
}