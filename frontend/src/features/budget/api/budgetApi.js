import { apiClient } from "@/shared/services/axios";

export const budgetApi = {
  analytics: (tripId) => apiClient.get(`/trips/${tripId}/budget/analytics`),
};

