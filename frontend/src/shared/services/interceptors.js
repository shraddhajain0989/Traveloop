import { tokenService } from "./tokenService";
import { normalizeApiError } from "./apiErrorHandler";

export function attachInterceptors(api) {
  api.interceptors.request.use((config) => {
    const token = tokenService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(normalizeApiError(error))
  );
}

