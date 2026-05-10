import { Card } from "@/shared/components/ui/Card";
import { useSettingsContext } from "@/app/providers/SettingsContext";

export function BudgetAlerts() {
  const { t } = useSettingsContext();
  return (
    <Card className="border-amber-200 bg-amber-50 p-5 dark:border-amber-500/30 dark:bg-amber-500/10">
      <h2 className="text-lg font-extrabold text-amber-900 dark:text-amber-200">{t("overspendAlert")}</h2>
      <p className="mt-1 text-sm text-amber-800 dark:text-amber-100">{t("overspendAlertDesc")}</p>
    </Card>
  );
}
