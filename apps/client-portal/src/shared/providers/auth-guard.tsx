"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth.store";
import { Spinner } from "./spinner";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.user?.access_token);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!accessToken) {
      router.replace("/login");
    }
  }, [accessToken, hasHydrated, router]);

  if (!hasHydrated || !accessToken) return <Spinner />;

  return <>{children}</>;
};
