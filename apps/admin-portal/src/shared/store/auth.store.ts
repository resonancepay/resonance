import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  access_token: string;
  token_type: string;
  must_change_password: boolean;
}

interface AuthState {
  user: AuthUser | null;
  hasHydrated: boolean;
  setAuth: (data: AuthUser) => void;
  clearAuth: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hasHydrated: false,
      setAuth: (data) => set({ user: data }),
      clearAuth: () => set({ user: null }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
