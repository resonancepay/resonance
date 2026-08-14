import { Profile } from "@/features/auth/types/auth.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  access_token: string;
  token_type: string;
  // Not present on verify-password's confirmed response — kept optional
  // rather than fabricating a value.
  must_change_password?: boolean;
  userInfo?: Profile;
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
