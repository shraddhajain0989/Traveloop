import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import { useTripContext } from "@/app/providers/TripContext";
import { useToast } from "@/app/providers/ToastProvider";

export function EditTripModal({ trip, onClose }) {
  const { updateTrip } = useTripContext();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    title: trip.title,
    destinations: trip.cities.join(", "),
    budget: trip.budget,
    travelers: trip.travelers,
    status: trip.status,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Trip name is required";
    if (!form.destinations.trim()) errs.destinations = "At least one destination is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await updateTrip(trip.id, {
        title: form.title.trim(),
        cities: form.destinations.split(",").map((c) => c.trim()).filter(Boolean),
        budget: Number(form.budget),
        travelers: Number(form.travelers),
        status: form.status,
      });

      showToast({ type: "success", title: "Trip updated", description: `"${form.title}" has been updated.` });
      onClose();
    } catch (error) {
      showToast({ title: "Unable to update trip", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        id="edit-trip-name"
        label="Trip Name"
        value={form.title}
        onChange={set("title")}
        error={errors.title}
        placeholder="e.g. Bali Workation"
      />
      <Input
        id="edit-destinations"
        label="Destinations (comma-separated)"
        value={form.destinations}
        onChange={set("destinations")}
        error={errors.destinations}
        placeholder="e.g. Ubud, Canggu, Uluwatu"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="edit-budget"
          label="Budget ($)"
          type="number"
          value={form.budget}
          onChange={set("budget")}
          placeholder="8420"
        />
        <Input
          id="edit-travelers"
          label="Travelers"
          type="number"
          value={form.travelers}
          onChange={set("travelers")}
          placeholder="4"
        />
      </div>
      <Select
        id="edit-status"
        label="Status"
        value={form.status}
        onChange={set("status")}
      >
        <option value="Planning">Planning</option>
        <option value="Booked">Booked</option>
        <option value="Draft">Draft</option>
        <option value="Completed">Completed</option>
      </Select>
      <div className="flex gap-3 pt-2">
        <Button isLoading={loading} type="submit">Save Changes</Button>
        <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  );
}
