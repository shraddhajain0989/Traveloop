import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { useTripContext } from "@/app/providers/TripContext";
import { useToast } from "@/app/providers/ToastProvider";

export function DeleteTripModal({ trip, onClose }) {
  const { deleteTrip } = useTripContext();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteTrip(trip.id);
      showToast({
        type: "success",
        title: "Trip deleted",
        description: `"${trip.title}" has been removed.`,
      });
      onClose();
    } catch (error) {
      showToast({ title: "Unable to delete trip", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Are you sure you want to delete{" "}
        <strong className="text-ink dark:text-white">"{trip.title}"</strong>? This action cannot be undone.
      </p>
      <div className="mt-5 flex gap-3">
        <Button variant="danger" isLoading={loading} onClick={handleDelete}>
          <Trash2 size={16} />
          Delete Trip
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
