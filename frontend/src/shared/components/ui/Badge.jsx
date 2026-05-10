import { cn } from "@/shared/lib/cn";

const toneMap = {
  blue: "bg-brand-50 text-brand-700 ring-brand-100",
  cyan: "bg-cyan-50 text-cyan-700 ring-cyan-100",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  red: "bg-red-50 text-red-700 ring-red-100",
};

export function Badge({ children, className, tone = "blue" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold ring-1",
        toneMap[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
