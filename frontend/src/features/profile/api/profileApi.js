import { apiClient } from "@/shared/services/axios";

export const profileApi = {
  update: (payload) => apiClient.put("/profile", payload),
};

