import { Card } from "@/shared/components/ui/Card";
import { PieChart } from "@/shared/components/charts/PieChart";
import { budgetCategories } from "@/shared/data/traveloopData";
import { useSettingsContext } from "@/app/providers/SettingsContext";

export function ExpenseBreakdown() {
  const { t } = useSettingsContext();
  return (
    <Card className="p-5">
      <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">{t("expenseBreakdown")}</h2>
      <PieChart data={budgetCategories} valueVariant="currency" />
    </Card>
  );
}
