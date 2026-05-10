import { apiClient } from "@/shared/services/axios";

export const activityApi = {
  search: (params) => apiClient.get("/activities", { params }),
};

