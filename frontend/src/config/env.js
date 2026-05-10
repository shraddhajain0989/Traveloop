export const env = {
  appName: import.meta.env.VITE_APP_NAME || "Traveloop",
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL || "http://localhost:5002/api").replace(/\/+$/, ""),
  enableMocks: import.meta.env.VITE_ENABLE_MOCKS !== "false",
};
