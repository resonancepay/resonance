import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth.store";
import { useLogout } from "@/features/auth/hooks/auth.hooks";

export const usePortalProfileMenu = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const userInfo = useAuthStore((state) => state.user?.userInfo);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const close = () => setOpen(false);

  // The session ends locally whether or not the server-side logout call
  // succeeds, so a failing request can never leave the user stuck signed in.
  const endSession = () => {
    clearAuth();
    router.push("/login");
  };
  const { mutate: logoutMutate } = useLogout(endSession, endSession);

  const goToProfile = () => {
    close();
    router.push("/profile");
  };

  const handleLogout = () => {
    close();
    logoutMutate();
  };

  return {
    open,
    setOpen,
    close,
    name: userInfo?.name ?? "—",
    email: userInfo?.email ?? "",
    goToProfile,
    handleLogout,
  };
};
