import { useState, useEffect } from "react";
import { CalendarDays, Edit3, MapPin, Trash2, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/shared/services/axios";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { formatDate } from "@/shared/lib/formatDate";
import { useModal } from "@/app/providers/ModalProvider";
import { useSettingsContext } from "@/app/providers/SettingsContext";
import { EditTripModal } from "./EditTripModal";
import { DeleteTripModal } from "./DeleteTripModal";

function statusTone(status) {
  if (status === "Booked") return "green";
  if (status === "Completed") return "green";
  if (status === "Planning") return "blue";
  return "default";
}

export function TripCard({ trip }) {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { formatCurrency } = useSettingsContext();
  const [image, setImage] = useState(trip.image);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      if (!trip.cities || trip.cities.length === 0) {
        setImgLoading(false);
        return;
      }
      try {
        const res = await apiClient.get(`/cities/image?city=${trip.cities[0]}`);
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
  }, [trip.cities]);

  const handleView = () => navigate(`/trips/${trip.id}`);

  const handleEdit = () =>
    openModal({
      title: "Edit Trip",
      content: <EditTripModal trip={trip} onClose={closeModal} />,
    });

  const handleDelete = () =>
    openModal({
      title: "Delete Trip",
      content: <DeleteTripModal trip={trip} onClose={closeModal} />,
    });

  const budgetPct = trip.budget > 0 ? Math.min(Math.round((trip.spent / trip.budget) * 100), 100) : 0;

  return (
    <Card as="article" interactive className="overflow-hidden dark:bg-slate-800 dark:border-slate-700">
      <div className="relative h-52 bg-slate-100 dark:bg-slate-800">
        {imgLoading ? (
          <div className="h-full w-full animate-pulse bg-slate-200 dark:bg-slate-700" />
        ) : (
          <img alt={trip.title} className="h-full w-full object-cover transition-opacity duration-500" src={image} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 to-transparent" />
        <Badge className="absolute right-4 top-4 bg-white/90" tone={statusTone(trip.status)}>
          {trip.status}
        </Badge>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <button
              className="text-left text-lg font-extrabold text-ink hover:text-brand-700 dark:text-white dark:hover:text-brand-300"
              onClick={handleView}
              type="button"
            >
              {trip.title}
            </button>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
              <MapPin size={15} />
              {trip.cities.join(", ")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <p className="text-slate-500 dark:text-slate-400">
            <CalendarDays className="mb-1" size={15} />
            <span className="font-bold text-slate-700 dark:text-slate-200">
              {formatDate(trip.startDate, { month: "short", day: "numeric" })}
            </span>
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            <UsersRound className="mb-1" size={15} />
            <span className="font-bold text-slate-700 dark:text-slate-200">{trip.travelers} people</span>
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            Budget
            <span className="mt-1 block font-bold text-slate-700 dark:text-slate-200">
              {formatCurrency(trip.budget)}
            </span>
          </p>
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Budget usage</span>
            <span>{budgetPct}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-cyan transition-all duration-500"
              style={{ width: `${budgetPct}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Button className="px-3" variant="secondary" onClick={handleView}>
            View
          </Button>
          <Button className="px-3" variant="ghost" onClick={handleEdit}>
            <Edit3 size={15} /> Edit
          </Button>
          <Button
            className="px-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
            variant="ghost"
            onClick={handleDelete}
          >
            <Trash2 size={15} /> Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
