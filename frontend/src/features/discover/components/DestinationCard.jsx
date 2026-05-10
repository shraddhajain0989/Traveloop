import { useState, useEffect } from "react";
import { MapPin, Star } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { useSettingsContext } from "@/app/providers/SettingsContext";
import { useToast } from "@/app/providers/ToastProvider";
import { apiClient } from "@/shared/services/axios";

export function DestinationCard({ destination }) {
  const { convertCurrency, formatCurrency, t } = useSettingsContext();
  const { showToast } = useToast();
  const convertedBudget = convertCurrency(destination.dailyBudget, destination.baseCurrency || "USD");

  const [image, setImage] = useState(destination.image);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await apiClient.get(`/cities/image?city=${destination.name}`);
        if (res.data?.success && res.data.data?.imageUrl) {
          setImage(res.data.data.imageUrl);
        }
      } catch (err) {
        console.error("Failed to fetch image", err);
      } finally {
        setImgLoading(false);
      }
    };
    fetchImage();
  }, [destination.name]);

  return (
    <Card as="article" interactive className="overflow-hidden dark:bg-slate-800 dark:border-slate-700">
      <div className="relative h-56 bg-slate-100 dark:bg-slate-800">
        {imgLoading ? (
          <div className="h-full w-full animate-pulse bg-slate-200 dark:bg-slate-700" />
        ) : (
          <img alt="" className="h-full w-full object-cover transition-opacity duration-500" src={image} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
        <Badge className="absolute right-4 top-4 bg-white/90" tone="blue">
          <Star className="mr-1 fill-amber-400 text-amber-400" size={13} />
          {destination.rating}
        </Badge>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-black">{destination.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-white/85">
            <MapPin size={14} />
            {destination.country}
          </p>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-700">
            <p className="text-slate-500 dark:text-slate-400">{t("dailyBudget") || "Daily budget"}</p>
            <p className="font-black text-ink dark:text-white">{formatCurrency(convertedBudget)}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-700">
            <p className="text-slate-500 dark:text-slate-400">{t("bestSeason") || "Best season"}</p>
            <p className="font-black text-ink dark:text-white">{destination.season}</p>
          </div>
        </div>
        {destination.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {destination.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-200">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        {destination.description ? (
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{destination.description}</p>
        ) : null}
        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            onClick={() => showToast({ type: "success", title: t("addToTrip"), description: `${destination.name} ${t("addedToItinerary", "added")}.` })}
          >
            {t("addToTrip") || "Add to Trip"}
          </Button>
          <Button 
            className="flex-1" 
            variant="secondary"
            onClick={() => showToast({ title: t("learnMore"), description: destination.description })}
          >
            {t("learnMore") || "Learn More"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
