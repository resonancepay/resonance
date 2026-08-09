import { useAuthStore } from "@/shared/store/auth.store";
import { getTokenExpiryMs } from "@/shared/utils/jwt";
import { refresh } from "./auth.service";

const REFRESH_WINDOW_MS = 5 * 60 * 1000;

let refreshPromise: Promise<string | null> | null = null;

// Called before every API request and on every route change (see axios.ts
// and auth-guard.tsx). No timers — this only ever runs at points where the
// app is already doing work, so an idle tab never schedules anything.
export const ensureFreshToken = async (): Promise<string | null> => {
  const { user, setAuth, clearAuth } = useAuthStore.getState();
  const token = user?.access_token ?? null;
  if (!token) return null;
  const expiryMs = getTokenExpiryMs(token);
  if (expiryMs === null) return token;

  const now = Date.now();

  if (now >= expiryMs) {
    clearAuth();
    return null;
  }

  if (expiryMs - now > REFRESH_WINDOW_MS) {
    return token;
  }

  if (!refreshPromise) {
    refreshPromise = refresh()
      .then((data) => {
        setAuth({
          access_token: data.access_token,
          token_type: data.token_type,
          must_change_password:
            useAuthStore.getState().user?.must_change_password ?? false,
        });
        return data.access_token;
      })
      .catch(() => {
        clearAuth();
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};
