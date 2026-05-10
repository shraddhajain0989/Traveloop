import { trips } from "@/shared/data/traveloopData";

export function useTripDetails(tripId) {
  return { trip: trips.find((trip) => trip.id === tripId), isLoading: false, error: null };
}

