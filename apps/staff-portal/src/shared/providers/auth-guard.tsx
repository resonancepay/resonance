"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth.store";
import { Spinner } from "./spinner";

const ONBOARDING_PATH = "/onboarding";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = useAuthStore((state) => state.user?.access_token);
  // Defaults to false (not just undefined) so a missing/not-yet-fetched
  // profile fails closed — blocked from the rest of the app rather than
  // silently let through — same as a confirmed unapproved application.
  const isApproved = useAuthStore(
    (state) => state.user?.userInfo?.application_approved ?? false,
  );
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!accessToken) {
      router.replace("/login");
      return;
    }

    // Unapproved applications are confined to /onboarding — every other
    // (portal) route bounces back there, regardless of how it was reached
    // (nav click, direct URL, browser back/forward).
    if (!isApproved && pathname !== ONBOARDING_PATH) {
      router.replace(ONBOARDING_PATH);
    }
  }, [accessToken, isApproved, pathname, hasHydrated, router]);

  if (!hasHydrated || !accessToken) return <Spinner />;
  if (!isApproved && pathname !== ONBOARDING_PATH) return <Spinner />;

  return <>{children}</>;
};
