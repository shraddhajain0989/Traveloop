import { Card } from "@/shared/components/ui/Card";
import { useSettingsContext } from "@/app/providers/SettingsContext";

const destinations = ["Bali", "Kyoto", "Lisbon", "Interlaken"];

export function PopularDestinations() {
  const { t } = useSettingsContext();
  return (
    <Card className="p-5">
      <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">{t("popularDestinations")}</h2>
      <div className="mt-4 space-y-3">
        {destinations.map((destination, index) => (
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800" key={destination}>
            <span className="font-semibold text-slate-700 dark:text-slate-100">{destination}</span>
            <span className="text-sm font-bold text-brand-700">#{index + 1}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
