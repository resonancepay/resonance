import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/store/auth.store";
import {
  useChangePassword,
  useDeleteAccount,
  useProfile,
} from "@/features/auth/hooks/auth.hooks";
import { ChangePasswordPayload } from "@/features/auth/types/auth.type";
import { useToast } from "@/shared/toast";
import {
  AvailabilityEntry,
  NewAvailabilityEntry,
  ServiceLocation,
  StatusTag,
} from "../types/profile.type";
import {
  AVAILABILITIES_QUERY_KEY,
  useAvailabilities,
  useDeleteAvailability,
  SERVICE_LOCATION_QUERY_KEY,
  useServiceLocation,
  useSetupAvailability,
  useSetupServiceLocation,
} from "./profile.hooks";
import { geocodePostcode } from "../services/geocoding.service";
import { toAvailabilityDraftEntries } from "../components/modal/setup-availability-modal";
import { STATE_OPTIONS } from "../components/modal/set-service-location-modal";

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
  const [serviceLocationOpen, setServiceLocationOpen] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);

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

  const { data: availabilities } = useAvailabilities();
  const { data: fetchedServiceLocation } = useServiceLocation();

  const availability: AvailabilityEntry[] = availabilities ?? [];
  const serviceLocation: ServiceLocation =
    fetchedServiceLocation ?? EMPTY_SERVICE_LOCATION;

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
        queryClient.invalidateQueries({ queryKey: AVAILABILITIES_QUERY_KEY });
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
        queryClient.invalidateQueries({ queryKey: AVAILABILITIES_QUERY_KEY });
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

  const openServiceLocation = () => setServiceLocationOpen(true);
  const closeServiceLocation = () => setServiceLocationOpen(false);

  const { mutate: setupServiceLocationMutate, isPending: isSettingServiceLocation } =
    useSetupServiceLocation(
      () => {
        addToast({
          variant: "success",
          title: "Service location updated",
          description: "Your service location has been saved.",
        });
        queryClient.invalidateQueries({ queryKey: SERVICE_LOCATION_QUERY_KEY });
        closeServiceLocation();
      },
      (e: any) => {
        const detail = e?.response?.data?.detail;
        const message =
          typeof detail === "string" && detail
            ? detail
            : "Could not save your service location. Please try again.";
        addToast({ variant: "error", title: "Save failed", description: message });
      },
    );

  // The API wants coordinates for each postcode, so the filled areas are
  // looked up first and nothing is sent if any of them can't be found.
  // Area 2 is optional and is left out entirely when it's empty.
  const handleSaveServiceLocation = async (location: ServiceLocation) => {
    const hasArea2 = !!location.area2.postcode.trim();

    setIsGeocoding(true);
    try {
      const [coords1, coords2] = await Promise.all([
        geocodePostcode(location.area1.postcode),
        hasArea2 ? geocodePostcode(location.area2.postcode) : Promise.resolve(null),
      ]);

      const missing = !coords1
        ? location.area1.postcode
        : hasArea2 && !coords2
          ? location.area2.postcode
          : null;
      if (missing || !coords1) {
        addToast({
          variant: "error",
          title: "Postcode not found",
          description: `We couldn't locate "${missing}". Check it and try again.`,
        });
        return;
      }

      setupServiceLocationMutate({
        state:
          STATE_OPTIONS.find((option) => option.value === location.state)?.label ??
          location.state,
        area1: {
          postcode: location.area1.postcode,
          radius: Number(location.area1.radius),
          gps_lat: coords1.lat,
          gps_lng: coords1.lng,
        },
        area2:
          hasArea2 && coords2
            ? {
                postcode: location.area2.postcode,
                radius: Number(location.area2.radius),
                gps_lat: coords2.lat,
                gps_lng: coords2.lng,
              }
            : undefined,
      });
    } catch {
      addToast({
        variant: "error",
        title: "Lookup failed",
        description: "Could not look up your postcodes. Please try again.",
      });
    } finally {
      setIsGeocoding(false);
    }
  };

  return {
    isLoading,
    fullName,
    cleanerId: userInfo?.cleaner_id ?? "—",
    dateRegistered: userInfo?.date_registered ?? "—",
    dateApproved: userInfo?.date_approved ?? "—",
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
    serviceLocationOpen,
    openServiceLocation,
    closeServiceLocation,
    handleSaveServiceLocation,
    isSavingServiceLocation: isGeocoding || isSettingServiceLocation,
  };
};
