import { apiClient } from "@/shared/services/axios";

export const destinationApi = {
  search: (query) => apiClient.get("/destinations", { params: { query } }),
};

