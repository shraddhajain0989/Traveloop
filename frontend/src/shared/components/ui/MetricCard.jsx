import { TrendingUp } from "lucide-react";
import { Card } from "./Card";

export function MetricCard({ label, value, delta, icon: Icon = TrendingUp }) {
  return (
    <Card interactive className="p-5">
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-cyan-50 text-brand-600 dark:from-brand-900/50 dark:to-sky-900/40 dark:text-brand-300">
          <Icon size={22} />
        </span>
        {delta && (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            {delta}
          </span>
        )}
      </div>
      <p className="mt-5 text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-3xl font-black tracking-tight text-slate-950 dark:text-white">{value}</p>
    </Card>
  );
}
