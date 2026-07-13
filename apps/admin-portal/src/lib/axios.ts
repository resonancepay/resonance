import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ────────────────────────────────────────────
// Runs before every outgoing request.
// Once the auth store is set up, replace the localStorage call
// with however the token is stored (e.g. zustand store, cookies, etc.)
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("auth-store");
        const token = raw ? JSON.parse(raw)?.state?.user?.access_token : null;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        // corrupted storage — skip attaching token
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ───────────────────────────────────────────
// Runs on every response that comes back.
// 401 → token expired or invalid → clear session and redirect to login
// All other errors are re-thrown so each service can handle them.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginEndpoint = error.config?.url?.includes("/login");
    console.log(error, "error from response");
    if (error.response?.status === 401 && !isLoginEndpoint) {
      // if (typeof window !== "undefined") {
      //   localStorage.removeItem("auth-store");
      //   window.location.href = "/login";
      // }
    }

    return Promise.reject(error);
  },
);

export { apiClient };
