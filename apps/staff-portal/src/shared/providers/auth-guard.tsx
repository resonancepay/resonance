"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth.store";

const Spinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface">
    <div className="w-10 h-10 rounded-full border-4 border-brand-secondary-text-icons border-t-transparent animate-spin" />
  </div>
);

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
