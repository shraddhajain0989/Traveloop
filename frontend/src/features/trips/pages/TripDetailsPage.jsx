import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TripHeader } from "../components/TripHeader";
import { ItineraryTimeline } from "../components/ItineraryTimeline";
import { Card } from "@/shared/components/ui/Card";
import { useTripContext } from "@/app/providers/TripContext";
import { useSettingsContext } from "@/app/providers/SettingsContext";

export default function TripDetailsPage() {
  const { tripId } = useParams();
  const { trips, setSelectedTripId } = useTripContext();
  const { formatCurrency, t } = useSettingsContext();
  const trip = trips.find((item) => item.id === tripId) || trips[0];

  useEffect(() => {
    if (tripId) {
      setSelectedTripId(tripId);
    }
  }, [tripId, setSelectedTripId]);

  if (!trip) return null;

  return (
    <div className="mt-6 space-y-6">
      <TripHeader trip={trip} />
      <div className="grid gap-6 lg:grid-cols-[1fr_0.35fr]">
        <ItineraryTimeline stops={trip.stops} />
        <Card className="h-fit p-5 dark:bg-slate-800 dark:border-slate-700">
          <h2 className="text-xl font-extrabold text-ink dark:text-white">Trip controls</h2>
          <div className="mt-4 space-y-3 text-sm">
            <p className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>{t("budget")}</span><strong className="text-ink dark:text-white">{formatCurrency(trip?.budget || 0)}</strong>
            </p>
            <p className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>{t("totalSpent")}</span><strong className="text-ink dark:text-white">{formatCurrency(trip?.spent || 0)}</strong>
            </p>
            <p className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>{t("travelers")}</span><strong className="text-ink dark:text-white">{trip?.travelers || 1}</strong>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
