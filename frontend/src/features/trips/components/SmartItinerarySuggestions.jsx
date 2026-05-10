import { useState, useEffect } from "react";
import { Sparkles, Loader2, Map, Calendar, Coffee, MapPin } from "lucide-react";
import { apiClient } from "@/shared/services/axios";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";

export function SmartItinerarySuggestions({ city, days, travelType = "budget" }) {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      if (!city || !days) return;
      
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.post("/itinerary/generate", {
          city,
          days,
          travelType
        });
        if (res.data?.success) {
          setItinerary(res.data.data.itinerary);
        } else {
          setError(res.data?.message || "Failed to load itinerary");
        }
      } catch (err) {
        console.error("Failed to generate itinerary:", err);
        setError("Error communicating with AI service");
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [city, days, travelType]);

  if (!city) return null;

  return (
    <Card className="mt-6 overflow-hidden border-brand-200 bg-white/60 p-0 backdrop-blur-xl dark:border-brand-800/50 dark:bg-slate-900/40">
      <div className="bg-gradient-to-r from-brand-500 to-accent-cyan p-5 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-black leading-tight text-white drop-shadow-sm">Smart AI Suggestions</h3>
            <p className="text-sm font-medium text-white/80">Tailored for {city} • {days} Days • {travelType}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-full bg-brand-200 opacity-75 dark:bg-brand-900/50"></div>
              <Loader2 className="relative animate-spin text-brand-600 dark:text-brand-400" size={32} />
            </div>
            <p className="mt-4 animate-pulse text-sm font-bold text-slate-500 dark:text-slate-400">
              AI is crafting your perfect itinerary...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center dark:border-red-900/30 dark:bg-red-900/10">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
            <Button variant="secondary" className="mt-4" onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        ) : itinerary && itinerary.length > 0 ? (
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-300 before:via-brand-200 before:to-transparent dark:before:from-brand-700 dark:before:via-brand-800">
            {itinerary.map((day, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-brand-500 text-white font-bold shadow-sm dark:border-slate-800 dark:bg-brand-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  {day.day}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-premium border border-slate-100 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge tone="blue">{day.title}</Badge>
                  </div>
                  <div className="space-y-4">
                    {day.activities.map((act, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="mt-0.5 shrink-0">
                          {act.time === "Morning" && <Coffee size={16} className="text-amber-500" />}
                          {act.time === "Afternoon" && <Map size={16} className="text-brand-500" />}
                          {act.time === "Evening" && <MapPin size={16} className="text-indigo-500" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{act.time}</p>
                          <p className="font-bold text-ink dark:text-white mt-0.5">{act.place}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{act.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-sm text-slate-500 dark:text-slate-400">Select a city and dates to see AI suggestions.</p>
          </div>
        )}
      </div>
    </Card>
  );
}
