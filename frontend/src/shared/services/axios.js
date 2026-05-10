import axios from "axios";
import { env } from "@/config/env";
import { attachInterceptors } from "./interceptors";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

attachInterceptors(apiClient);

