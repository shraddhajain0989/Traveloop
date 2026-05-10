import { Clock3, GripVertical, Plane } from "lucide-react";
import { Card } from "@/shared/components/ui/Card";
import { itineraryStops } from "@/shared/data/traveloopData";

export function ItineraryTimeline({ stops = itineraryStops }) {
  const timelineStops = stops.length > 0 ? stops : itineraryStops;

  return (
    <div className="space-y-4">
      {timelineStops.map((stop, index) => (
        <div className="relative" key={stop.id}>
          {index < timelineStops.length - 1 && <div className="absolute left-10 top-20 h-full w-px bg-gradient-to-b from-brand-200 to-cyan-200" />}
        <Card interactive className="grid gap-4 p-5 sm:grid-cols-[auto_1fr]">
          <div className="flex items-center gap-3 text-brand-700">
            <GripVertical size={18} />
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-cyan text-sm font-black text-white shadow-glow">
              D{stop.day}
            </span>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-700">{stop.city}</p>
            <h3 className="mt-1 text-lg font-extrabold text-ink">{stop.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {(stop.activities || []).map((activity) => (
                <span className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700" key={activity}>
                  {activity}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1"><Clock3 size={14} /> Optimized day flow</span>
              <span className="flex items-center gap-1"><Plane size={14} /> Transfer aware</span>
            </div>
          </div>
        </Card>
        </div>
      ))}
    </div>
  );
}
