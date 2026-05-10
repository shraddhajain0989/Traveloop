import { cn } from "@/shared/lib/cn";

export function Skeleton({ className }) {
  return <div className={cn("animate-pulse rounded-lg bg-slate-200", className)} />;
}

