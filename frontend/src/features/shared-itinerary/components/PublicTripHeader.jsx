import { Badge } from "@/shared/components/ui/Badge";
import { useSettingsContext } from "@/app/providers/SettingsContext";

export function PublicTripHeader({ trip }) {
  const { t } = useSettingsContext();
  return (
    <section className="rounded-2xl bg-gradient-to-br from-brand-900 to-accent-cyan p-8 text-white shadow-glow">
      <Badge tone="cyan">{t("publicItinerary") || "Public itinerary"}</Badge>
      <h1 className="mt-4 text-4xl font-extrabold">{trip?.title || "Shared itinerary"}</h1>
      <p className="mt-2 text-slate-100">{t("readOnlyShare") || "Read-only share page for friends, teammates, and collaborators."}</p>
      {trip?.cities?.length ? <p className="mt-3 text-slate-100/90">{trip.cities.join(" -> ")}</p> : null}
    </section>
  );
}
