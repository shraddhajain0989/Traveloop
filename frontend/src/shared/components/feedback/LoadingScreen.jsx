import { Skeleton } from "@/shared/components/ui/Skeleton";

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <Skeleton className="h-12 w-48" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
      <Skeleton className="mt-6 h-96" />
    </div>
  );
}

