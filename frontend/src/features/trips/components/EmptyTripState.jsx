import { EmptyState } from "@/shared/components/ui/EmptyState";

export function EmptyTripState() {
  return (
    <EmptyState
      title="No trips yet"
      description="Create your first multi-city trip to unlock itinerary, budget, and checklist workflows."
      actionLabel="Create trip"
    />
  );
}

