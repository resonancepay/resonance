import axios from "axios";

// Bare axios instance, deliberately without interceptors — used only by
// auth.service.ts for /login and /refresh. Those calls must not go through
// apiClient's request interceptor (which itself depends on the refresh flow),
// so this keeps that dependency one-directional instead of circular.
export const authClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
