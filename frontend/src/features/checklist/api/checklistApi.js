import { apiClient } from "@/shared/services/axios";

export const checklistApi = {
  list: (tripId) => apiClient.get(`/checklist/trip/${tripId}`),
  add: (payload) => apiClient.post("/checklist/add", payload),
  update: (itemId, payload) => apiClient.put(`/checklist/update/${itemId}`, payload),
  delete: (itemId) => apiClient.delete(`/checklist/delete/${itemId}`),
};
