import { apiClient } from "@/shared/services/axios";

export const tripApi = {
  list: () => apiClient.get("/trips"),
  details: (tripId) => apiClient.get(`/trips/${tripId}`),
  create: (payload) => apiClient.post("/trips", payload),
  update: (tripId, payload) => apiClient.put(`/trips/${tripId}`, payload),
  delete: (tripId) => apiClient.delete(`/trips/${tripId}`),
};

