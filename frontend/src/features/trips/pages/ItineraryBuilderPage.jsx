import { useMemo, useState } from "react";
import { Download, Pencil, Plus, Share2, Trash2 } from "lucide-react";
import { useTripContext } from "@/app/providers/TripContext";
import { useSettingsContext } from "@/app/providers/SettingsContext";
import { useToast } from "@/app/providers/ToastProvider";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { PageHeader } from "@/shared/components/ui/PageHeader";
import { Select } from "@/shared/components/ui/Select";
import { ItineraryTimeline } from "../components/ItineraryTimeline";

function sanitizeStops(stops) {
  return stops
    .filter((stop) => stop.city?.trim())
    .map((stop, index) => ({
      ...stop,
      day: index + 1,
      activities: stop.activities || [],
      city: stop.city.trim(),
      title: stop.title?.trim() || `${stop.city.trim()} itinerary`,
    }));
}

export default function ItineraryBuilderPage() {
  const { trips, selectedTripId, setSelectedTripId, updateTrip } = useTripContext();
  const { t } = useSettingsContext();
  const { showToast } = useToast();
  const [draftStop, setDraftStop] = useState({ city: "", title: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const activeTrip = useMemo(
    () => trips.find((trip) => trip.id === selectedTripId) || trips[0] || null,
    [selectedTripId, trips]
  );
  const stops = activeTrip?.stops || [];

  const persistStops = async (nextStops, successMessage) => {
    if (!activeTrip) {
      showToast({ title: t("selectTripFirst") });
      return;
    }

    setIsSaving(true);
    try {
      await updateTrip(activeTrip.id, {
        title: activeTrip.title,
        cities: nextStops.map((stop) => stop.city),
        budget: activeTrip.budget,
        travelers: activeTrip.travelers,
        status: activeTrip.status,
      });
      showToast({ type: "success", title: successMessage });
    } catch (error) {
      showToast({ title: t("itineraryUpdated"), description: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddStop = async () => {
    const city = draftStop.city.trim();
    if (!city) {
      showToast({ title: t("stopNamePlaceholder") });
      return;
    }

    const nextStops = sanitizeStops([
      ...stops,
      {
        id: `draft-stop-${Date.now()}`,
        city,
        title: draftStop.title.trim() || `${city} itinerary`,
        activities: [],
      },
    ]);

    await persistStops(nextStops, t("addStopSuccess"));
    setDraftStop({ city: "", title: "" });
  };

  const handleRemoveStop = async (indexToRemove) => {
    const nextStops = sanitizeStops(stops.filter((_, index) => index !== indexToRemove));
    await persistStops(nextStops, t("itineraryUpdated"));
  };

  const moveStop = async (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= stops.length) return;
    const nextStops = [...stops];
    const [moved] = nextStops.splice(fromIndex, 1);
    nextStops.splice(toIndex, 0, moved);
    await persistStops(sanitizeStops(nextStops), t("itineraryUpdated"));
  };

  const handleExport = async () => {
    if (!activeTrip) {
      showToast({ title: t("selectTripFirst") });
      return;
    }

    setIsExporting(true);
    try {
      const payload = [
        activeTrip.title,
        "",
        ...stops.map((stop, index) => `${index + 1}. ${stop.city} - ${stop.title}`),
      ].join("\n");
      const blob = new Blob([payload], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${activeTrip.title.toLowerCase().replace(/\s+/g, "-")}-itinerary.txt`;
      link.click();
      URL.revokeObjectURL(url);
      showToast({ type: "success", title: t("itineraryExported") });
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (!activeTrip) {
      showToast({ title: t("selectTripFirst") });
      return;
    }

    setIsSharing(true);
    try {
      const shareUrl = `${window.location.origin}/share/${activeTrip.shareId || activeTrip.id}`;
      await navigator.clipboard.writeText(shareUrl);
      showToast({ type: "success", title: t("itineraryShared"), description: shareUrl });
    } catch {
      showToast({ title: t("shareItinerary"), description: `${window.location.origin}/share/${activeTrip.shareId || activeTrip.id}` });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="mt-6 space-y-6">
      <PageHeader
        eyebrow={t("itineraryBuilder")}
        title={t("itineraryBuilder")}
        description={t("itineraryDesc")}
      />

      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-950/80 lg:grid-cols-[220px_1fr_1fr_auto]">
        <Select
          id="itinerary-trip-select"
          label={t("myTrips")}
          value={activeTrip?.id || ""}
          onChange={(event) => setSelectedTripId(event.target.value)}
        >
          {trips.map((trip) => (
            <option key={trip.id} value={trip.id}>
              {trip.title}
            </option>
          ))}
        </Select>
        <Input
          id="new-stop-city"
          label={t("addStop")}
          placeholder={t("stopNamePlaceholder")}
          value={draftStop.city}
          onChange={(event) => setDraftStop((current) => ({ ...current, city: event.target.value }))}
        />
        <Input
          id="new-stop-title"
          label={t("editItinerary")}
          placeholder={t("stopTitlePlaceholder")}
          value={draftStop.title}
          onChange={(event) => setDraftStop((current) => ({ ...current, title: event.target.value }))}
        />
        <div className="flex items-end">
          <Button className="w-full" isLoading={isSaving} onClick={handleAddStop}>
            <Plus size={16} />
            {t("addStop")}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant={isEditing ? "primary" : "secondary"} onClick={() => setIsEditing((current) => !current)}>
          <Pencil size={16} />
          {t("editItinerary")}
        </Button>
        <Button variant="secondary" isLoading={isExporting} onClick={handleExport}>
          <Download size={16} />
          {t("exportItinerary")}
        </Button>
        <Button variant="secondary" isLoading={isSharing} onClick={handleShare}>
          <Share2 size={16} />
          {t("shareItinerary")}
        </Button>
      </div>

      {isEditing && activeTrip ? (
        <div className="space-y-3 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-950/80">
          {stops.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("selectTripFirst")}</p>
          ) : (
            stops.map((stop, index) => (
              <div key={`${stop.id}-${index}`} className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700">
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-950 dark:text-white">{stop.city}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{stop.title}</p>
                </div>
                <Button variant="ghost" onClick={() => moveStop(index, index - 1)}>{t("moveUp")}</Button>
                <Button variant="ghost" onClick={() => moveStop(index, index + 1)}>{t("moveDown")}</Button>
                <Button variant="ghost" className="text-red-600 dark:text-red-300" onClick={() => handleRemoveStop(index)}>
                  <Trash2 size={16} />
                  {t("removeStop")}
                </Button>
              </div>
            ))
          )}
        </div>
      ) : null}

      <ItineraryTimeline stops={stops} />
    </div>
  );
}
