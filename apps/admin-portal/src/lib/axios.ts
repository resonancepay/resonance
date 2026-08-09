import axios from "axios";
import { useAuthStore } from "@/shared/store/auth.store";
import { ensureFreshToken } from "@/features/auth/services/token-refresh.service";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ────────────────────────────────────────────
// Runs before every outgoing request. ensureFreshToken checks the current
// token's expiry and refreshes it inline if it's close to expiring, then
// we attach whatever token comes back (or none, if the session is dead).
apiClient.interceptors.request.use(
  async (config) => {
    if (typeof window === "undefined") return config;

    const token = await ensureFreshToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ───────────────────────────────────────────
// Runs on every response that comes back.
// 401 → session invalid → clear the store. AuthGuard reacts to that change
// and redirects to /login, so no manual navigation is needed here.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
    }

    return Promise.reject(error);
  },
);

export { apiClient };
