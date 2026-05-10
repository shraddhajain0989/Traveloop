import { Card } from "@/shared/components/ui/Card";
import { BarChart } from "@/shared/components/charts/BarChart";
import { monthlySpend } from "@/shared/data/traveloopData";
import { useSettingsContext } from "@/app/providers/SettingsContext";

export function DailyBudgetChart() {
  const { t } = useSettingsContext();
  return (
    <Card className="p-5">
      <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">{t("budgetVelocity")}</h2>
      <BarChart data={monthlySpend} dataKey="amount" color="#5B4BFF" valueVariant="currency" />
    </Card>
  );
}
