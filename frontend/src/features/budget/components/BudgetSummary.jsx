import { Card } from "@/shared/components/ui/Card";
import { useSettingsContext } from "@/app/providers/SettingsContext";

export function BudgetSummary({ budget, spent }) {
  const { formatCurrency, t } = useSettingsContext();
  const percent = budget > 0 ? Math.min(Math.round((spent / budget) * 100), 100) : 0;
  return (
    <Card className="p-5 dark:bg-slate-800 dark:border-slate-700">
      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{t("totalBudget")}</p>
      <h2 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">{formatCurrency(budget)}</h2>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
        <div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-accent-cyan" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{percent}% {t("totalSpent").toLowerCase()}</p>
    </Card>
  );
}
