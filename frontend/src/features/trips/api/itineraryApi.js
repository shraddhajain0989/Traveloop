import { apiClient } from "@/shared/services/axios";

export const itineraryApi = {
  list: (tripId) => apiClient.get(`/trips/${tripId}/itinerary`),
  reorder: (tripId, payload) => apiClient.patch(`/trips/${tripId}/itinerary/reorder`, payload),
};

