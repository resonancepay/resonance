import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth.store";
import {
  useChangePassword,
  useDeleteProfile,
  useProfile,
} from "@/features/auth/hooks/auth.hooks";
import { ChangePasswordPayload } from "@/features/auth/types/auth.type";
import { useToast } from "@/shared/toast";
import { StatusTag } from "../types/profile.type";

const ACTIVE_TAG: StatusTag = { variant: "success", label: "Active" };
const INACTIVE_TAG: StatusTag = { variant: "disabled", label: "Inactive" };

export const useProfileScreen = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

  const { data: fetchedProfile, isLoading } = useProfile();

  // Keeps the persisted store in sync with the freshest fetch, so the nav
  // menu and anything else reading userInfo stays current.
  useEffect(() => {
    if (!fetchedProfile || !user?.access_token) return;
    setAuth({
      access_token: user.access_token,
      token_type: user.token_type,
      must_change_password: user.must_change_password,
      userInfo: fetchedProfile,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedProfile]);

  const userInfo = fetchedProfile ?? user?.userInfo;

  const statusTag = userInfo?.is_active === false ? INACTIVE_TAG : ACTIVE_TAG;

  const openChangePassword = () => setChangePasswordOpen(true);
  const closeChangePassword = () => setChangePasswordOpen(false);

  const { mutate: changePasswordMutate, isPending: isChangingPassword } =
    useChangePassword(
      () => {
        addToast({
          variant: "success",
          title: "Password changed",
          description: "Your account password has been updated.",
        });
        closeChangePassword();
      },
      (e: any) => {
        const detail = e?.response?.data?.detail;
        const message =
          typeof detail === "string" && detail
            ? detail
            : "Could not change your password. Please try again.";
        addToast({ variant: "error", title: "Password change failed", description: message });
      },
    );

  const handleChangePassword = (payload: ChangePasswordPayload) => {
    changePasswordMutate(payload);
  };

  const openDeleteAccount = () => setDeleteAccountOpen(true);
  const closeDeleteAccount = () => setDeleteAccountOpen(false);

  const { mutate: deleteAccountMutate, isPending: isDeletingAccount } =
    useDeleteProfile(
      () => {
        addToast({
          variant: "success",
          title: "Account deleted",
          description: "Your account has been deleted.",
        });
        clearAuth();
        router.push("/login");
      },
      (e: any) => {
        const detail = e?.response?.data?.detail;
        const message =
          typeof detail === "string" && detail
            ? detail
            : "Could not delete your account. Please try again.";
        addToast({ variant: "error", title: "Delete failed", description: message });
      },
    );

  const handleDeleteAccount = () => {
    deleteAccountMutate();
  };

  return {
    isLoading,
    clientName: userInfo?.name ?? "—",
    email: userInfo?.email ?? "—",
    dateRegistered: userInfo?.joined_date ?? "—",
    totalJobs: String(userInfo?.total_jobs ?? 0),
    completedJobs: String(userInfo?.completed_jobs ?? 0),
    statusTag,
    changePasswordOpen,
    openChangePassword,
    closeChangePassword,
    handleChangePassword,
    isChangingPassword,
    deleteAccountOpen,
    openDeleteAccount,
    closeDeleteAccount,
    handleDeleteAccount,
    isDeletingAccount,
  };
};
