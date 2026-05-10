import { apiClient } from "@/shared/services/axios";

export const sharedTripApi = {
  getPublicTrip: (shareId) => apiClient.get(`/share/${shareId}`),
};

