import { useState } from "react";
import { CheckCircle2, Clock, Star } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { useSettingsContext } from "@/app/providers/SettingsContext";
import { useToast } from "@/app/providers/ToastProvider";

export function ActivityCard({ activity }) {
  const { showToast } = useToast();
  const { formatCurrency, t } = useSettingsContext();
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToItinerary = async () => {
    if (added) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setAdded(true);
    setLoading(false);
    showToast({
      type: "success",
      title: `${t("addedToItinerary")} 🗺️`,
      description: `${activity.name} has been added.`,
    });
  };

  return (
    <Card as="article" interactive className="overflow-hidden dark:bg-slate-800 dark:border-slate-700">
      <div className="relative h-44">
        <img alt={activity.name} className="h-full w-full object-cover" src={activity.image} />
        <Badge className="absolute right-4 top-4 bg-white/90" tone="cyan">
          {activity.category}
        </Badge>
      </div>
      <div className="p-5">
        <h3 className="font-black text-ink dark:text-white">{activity.name}</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{activity.city}</p>
        <div className="mt-4 flex items-center justify-between text-sm font-bold text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-1">
            <Star className="fill-amber-400 text-amber-400" size={15} />
            {activity.rating}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={15} />
            {activity.duration}
          </span>
          <span className="text-brand-700 dark:text-brand-300">{formatCurrency(activity.price)}</span>
        </div>
        <Button
          className={`mt-5 w-full transition-all ${added ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
          variant={added ? "primary" : "primary"}
          onClick={handleAddToItinerary}
          isLoading={loading}
          disabled={added}
        >
          {added ? (
            <>
              <CheckCircle2 size={16} />
              {t("addedToItinerary")}
            </>
          ) : (
            t("addToItinerary")
          )}
        </Button>
      </div>
    </Card>
  );
}
