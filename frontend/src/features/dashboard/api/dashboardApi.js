import { apiClient } from "@/shared/services/axios";

export const dashboardApi = {
  summary: () => apiClient.get("/dashboard/summary"),
};

