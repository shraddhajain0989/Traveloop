import { trips } from "@/shared/data/traveloopData";

export function useTrips() {
  return { trips, isLoading: false, error: null };
}

