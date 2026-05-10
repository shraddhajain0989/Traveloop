import { apiClient } from "@/shared/services/axios";

export const authApi = {
  login: (payload) => apiClient.post("/auth/login", payload),
  signup: (payload) => apiClient.post("/auth/signup", payload),
  forgotPassword: (payload) => apiClient.post("/auth/forgot-password", payload),
  me: () => apiClient.get("/auth/me"),
};

