import { Card } from "@/shared/components/ui/Card";
import { AreaChart } from "@/shared/components/charts/AreaChart";
import { dailySpend } from "@/shared/data/traveloopData";
import { useSettingsContext } from "@/app/providers/SettingsContext";

export function BudgetInsights() {
  const { t } = useSettingsContext();
  return (
    <Card className="p-5">
      <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">{t("budgetVelocity")}</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("plannedVsActual")}</p>
      <div className="mt-5">
        <AreaChart data={dailySpend} valueVariant="currency" />
      </div>
    </Card>
  );
}
