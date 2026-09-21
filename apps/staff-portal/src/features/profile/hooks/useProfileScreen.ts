import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/store/auth.store";
import {
  PROFILE_QUERY_KEY,
  useChangePassword,
  useDeleteAccount,
  useProfile,
} from "@/features/auth/hooks/auth.hooks";
import {
  AvailabilityEntry,
  ChangePasswordPayload,
  NewAvailabilityEntry,
  ServiceLocation,
} from "@/features/auth/types/auth.type";
import { useToast } from "@/shared/toast";
import { StatusTag } from "../types/profile.type";
import { useDeleteAvailability, useSetupAvailability } from "./profile.hooks";
import { toAvailabilityDraftEntries } from "../components/modal/setup-availability-modal";

const EMPTY_SERVICE_LOCATION: ServiceLocation = {
  state: "",
  area1: { postcode: "", radius: "" },
  area2: { postcode: "", radius: "" },
};

const STATUS_TAGS: Record<string, StatusTag> = {
  approved: { variant: "success", label: "Active" },
  pending: { variant: "warning", label: "Pending" },
  submitted: { variant: "warning", label: "Pending Review" },
  declined: { variant: "danger", label: "Declined" },
};

export const useProfileScreen = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [availabilityOpen, setAvailabilityOpen] = useState(false);

  const { data: fetchedProfile, isLoading } = useProfile();

  // Keeps the persisted store in sync with the freshest fetch — same
  // fetch-then-setAuth pattern the onboarding screen uses for its poll.
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

  const fullName =
    [userInfo?.first_name, userInfo?.last_name].filter(Boolean).join(" ") ||
    "—";

  const statusTag: StatusTag =
    STATUS_TAGS[(userInfo?.application_status ?? "").toLowerCase()] ?? {
      variant: "gray",
      label: "Unknown",
    };

  const availability: AvailabilityEntry[] = userInfo?.availability ?? [];
  const serviceLocation: ServiceLocation =
    userInfo?.service_location ?? EMPTY_SERVICE_LOCATION;

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
    useDeleteAccount(
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

  const openAvailability = () => setAvailabilityOpen(true);
  const closeAvailability = () => setAvailabilityOpen(false);

  const { mutate: setupAvailabilityMutate, isPending: isSavingAvailability } =
    useSetupAvailability(
      () => {
        addToast({
          variant: "success",
          title: "Availability updated",
          description: "Your availability has been saved.",
        });
        queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
        closeAvailability();
      },
      (e: any) => {
        const detail = e?.response?.data?.detail;
        const message =
          typeof detail === "string" && detail
            ? detail
            : "Could not save your availability. Please try again.";
        addToast({ variant: "error", title: "Save failed", description: message });
      },
    );

  const handleSaveAvailability = (entries: NewAvailabilityEntry[]) => {
    setupAvailabilityMutate(entries);
  };

  const { mutate: deleteAvailabilityMutate, isPending: isRemovingAvailability } =
    useDeleteAvailability(
      () => {
        addToast({
          variant: "success",
          title: "Availability removed",
          description: "That availability slot has been removed.",
        });
        queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
      },
      (e: any) => {
        const detail = e?.response?.data?.detail;
        const message =
          typeof detail === "string" && detail
            ? detail
            : "Could not remove that availability slot. Please try again.";
        addToast({ variant: "error", title: "Remove failed", description: message });
      },
    );

  const handleRemoveAvailability = (availabilityId: number) => {
    deleteAvailabilityMutate({ availability_id: availabilityId });
  };

  return {
    isLoading,
    fullName,
    firstName: userInfo?.first_name ?? "—",
    lastName: userInfo?.last_name ?? "—",
    email: userInfo?.email ?? "—",
    phone: userInfo?.phone ?? "—",
    dateOfBirth: userInfo?.date_of_birth ?? "—",
    statusTag,
    availability,
    serviceLocation,
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
    availabilityOpen,
    openAvailability,
    closeAvailability,
    handleSaveAvailability,
    isSavingAvailability,
    handleRemoveAvailability,
    isRemovingAvailability,
    availabilityDraft: toAvailabilityDraftEntries(availability),
  };
};
