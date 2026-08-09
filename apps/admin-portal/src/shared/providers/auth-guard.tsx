"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth.store";
import { ensureFreshToken } from "@/features/auth/services/token-refresh.service";

const Spinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface">
    <div className="w-10 h-10 rounded-full border-4 border-brand-secondary-text-icons border-t-transparent animate-spin" />
  </div>
);

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = useAuthStore((state) => state.user?.access_token);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!accessToken) {
      router.replace("/login");
    }
  }, [accessToken, hasHydrated, router]);

  // Re-checks token expiry on every route change, refreshing inline if
  // we're inside the refresh window. This is the other trigger point besides
  // the axios request interceptor — together they cover navigation-only page
  // views and outgoing API calls without needing a background timer.
  useEffect(() => {
    if (!hasHydrated || !accessToken) return;
    ensureFreshToken();
  }, [pathname, hasHydrated, accessToken]);

  if (!hasHydrated || !accessToken) return <Spinner />;

  return <>{children}</>;
};
