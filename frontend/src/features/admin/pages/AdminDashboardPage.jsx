import { AnalyticsOverview } from "../components/AnalyticsOverview";
import { PageHeader } from "@/shared/components/ui/PageHeader";
import { useSettingsContext } from "@/app/providers/SettingsContext";

export default function AdminDashboardPage() {
  const { t } = useSettingsContext();
  return (
    <div className="mt-6 space-y-6">
      <PageHeader
        eyebrow="Admin analytics"
        title={t("adminTitle")}
        description={t("adminDesc")}
      />
      <AnalyticsOverview />
    </div>
  );
}
