import { useNavigate } from "react-router-dom";
import { TripCard } from "@/features/trips/components/TripCard";
import { useTripContext } from "@/app/providers/TripContext";
import { Button } from "@/shared/components/ui/Button";

export function UpcomingTrips() {
  const { trips } = useTripContext();
  const navigate = useNavigate();

  const upcoming = trips
    .filter((t) => t.status !== "Completed")
    .slice(0, 3);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-ink dark:text-white">Upcoming trips</h2>
        <Button variant="ghost" className="text-sm" onClick={() => navigate("/trips")}>
          View all →
        </Button>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {upcoming.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </section>
  );
}
