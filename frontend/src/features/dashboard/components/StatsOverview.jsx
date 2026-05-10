import { CalendarDays, CreditCard, Link2, MapPin } from "lucide-react";
import { MetricCard } from "@/shared/components/ui/MetricCard";
import { useTripContext } from "@/app/providers/TripContext";
import { useSettingsContext } from "@/app/providers/SettingsContext";

export function StatsOverview() {
  const { trips } = useTripContext();
  const { formatCurrency, t } = useSettingsContext();

  const totalCities = trips.reduce((acc, trip) => acc + (trip.cities?.length || 0), 0);
  const totalBudget = trips.reduce((acc, trip) => acc + (trip.budget || 0), 0);

  const metrics = [
    { label: t("activeTrips"), value: trips.length.toString(), delta: t("thisMonth") },
    { label: t("citiesPlanned"), value: totalCities.toString(), delta: t("globalExplorer") },
    { label: t("budgetTracked"), value: formatCurrency(totalBudget), delta: t("onTrack") },
    { label: t("sharedLinks"), value: "0", delta: t("privateMode") },
  ];

  const icons = [CalendarDays, MapPin, CreditCard, Link2];
  
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard icon={icons[index]} key={metric.label} {...metric} />
      ))}
    </section>
  );
}
