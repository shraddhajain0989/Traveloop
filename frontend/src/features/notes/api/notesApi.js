import { apiClient } from "@/shared/services/axios";

export const notesApi = {
  list: (tripId) => apiClient.get(`/trips/${tripId}/notes`),
  create: (tripId, payload) => apiClient.post(`/trips/${tripId}/notes`, payload),
  update: (noteId, payload) => apiClient.put(`/notes/update/${noteId}`, payload),
  delete: (noteId) => apiClient.delete(`/notes/delete/${noteId}`),
};
