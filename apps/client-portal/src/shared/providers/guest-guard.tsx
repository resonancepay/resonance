"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth.store";

export const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.user?.access_token);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    if (accessToken) {
      router.replace("/dashboard");
    }
  }, [accessToken, hasHydrated, router]);

  return <>{children}</>;
};
