import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCheckIn,
  useCheckOut,
  useDeleteDamage,
  useGetDamages,
  useGetJob,
  useReportDamage,
} from "./jobs.hook";
import { Damage, JobChecklistEntry } from "../types/job.types";
import { getCurrentPosition } from "../utils/get-current-position";
import { useToast } from "@/shared/toast";

const formatTime = (ms: number) =>
  new Date(ms).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

const formatDate = (ms: number) =>
  new Date(ms).toLocaleDateString(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const minutesToDurationLabel = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours} Hour${hours === 1 ? "" : "s"}`);
  if (minutes > 0 || hours === 0)
    parts.push(`${minutes} Minute${minutes === 1 ? "" : "s"}`);
  return parts.join(" ");
};

const formatDuration = (startMs: number, endMs: number) =>
  minutesToDurationLabel(Math.max(0, Math.round((endMs - startMs) / 60000)));

// Parses "HH:MM AM/PM" (checkin_at/checkout_at's format) into minutes since
// midnight, or null if the string is empty/unparseable.
const parseTimeOfDay = (time: string): number | null => {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = Number(match[1]) % 12;
  const minutes = Number(match[2]);
  if (match[3].toUpperCase() === "PM") hours += 12;
  return hours * 60 + minutes;
};

const formatCheckDuration = (checkinAt: string, checkoutAt: string) => {
  const start = parseTimeOfDay(checkinAt);
  const end = parseTimeOfDay(checkoutAt);
  if (start === null || end === null) return "N/A";
  const totalMinutes = end >= start ? end - start : end + 24 * 60 - start;
  return minutesToDurationLabel(totalMinutes);
};

const formatCurrency = (amount: number, currency: string) => {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
};

type ClockModal =
  | "none"
  | "clocking-in"
  | "clocked-in"
  | "not-at-site"
  | "could-not-clock-in"
  | "cannot-clock-out"
  | "about-to-clock-out"
  | "clocking-out"
  | "clocked-out";

const INITIAL_SLOTS = 4;
const MAX_SLOTS = 8;

export const useJobDetailsScreen = () => {
  const params = useParams<{ id: string }>();
  const jobId = Number(params.id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const { data: job, isLoading, isError } = useGetJob(jobId, !Number.isNaN(jobId));

  // API sends Title Case with spaces (e.g. "Approved"), so normalize before
  // comparing. Once a job is under review or approved, nothing on this
  // screen is actionable any more — every mutation guards on this, not just
  // the UI that hides it.
  const normalizedStatus = job
    ? job.status.trim().toLowerCase().replace(/\s+/g, "-")
    : "";
  const isLocked =
    normalizedStatus === "under-review" || normalizedStatus === "approved";

  const [checklist, setChecklist] = useState<JobChecklistEntry[] | null>(null);
  const activeChecklist = checklist ?? job?.checklist ?? [];

  const toggleChecklistItem = (index: number, value: boolean) => {
    if (isLocked) return;
    const base = checklist ?? job?.checklist ?? [];
    setChecklist(
      base.map((entry, i) => (i === index ? { ...entry, checked: value } : entry)),
    );
  };

  const completedChecklistCount = activeChecklist.filter((entry) => entry.checked).length;
  const checklistPercentage = activeChecklist.length
    ? Math.round((completedChecklistCount / activeChecklist.length) * 100)
    : 0;

  const [beforePhotos, setBeforePhotos] = useState<(File | null)[]>(
    Array(INITIAL_SLOTS).fill(null),
  );
  const [afterPhotos, setAfterPhotos] = useState<(File | null)[]>(
    Array(INITIAL_SLOTS).fill(null),
  );

  const updatePhoto = (
    slots: "before" | "after",
    index: number,
    file: File | null,
  ) => {
    if (isLocked) return;
    const setter = slots === "before" ? setBeforePhotos : setAfterPhotos;
    setter((prev) => prev.map((item, i) => (i === index ? file : item)));
  };

  const addSlot = (slots: "before" | "after") => {
    if (isLocked) return;
    const setter = slots === "before" ? setBeforePhotos : setAfterPhotos;
    setter((prev) => (prev.length >= MAX_SLOTS ? prev : [...prev, null]));
  };

  const [clockModal, setClockModal] = useState<ClockModal>("none");

  const invalidateJob = () => {
    queryClient.invalidateQueries({ queryKey: ["job", jobId] });
    queryClient.invalidateQueries({ queryKey: ["jobs"] });
  };

  const { mutate: checkInMutate, isPending: isCheckingIn } = useCheckIn(
    () => {
      invalidateJob();
      setClockModal("clocked-in");
    },
    () => setClockModal("could-not-clock-in"),
  );

  const { mutate: checkOutMutate, isPending: isCheckingOut } = useCheckOut(
    () => {
      invalidateJob();
      setClockModal("clocked-out");
    },
    (e: any) => {
      const detail = e?.response?.data?.detail;
      const message =
        typeof detail === "string" && detail
          ? detail
          : "Could not clock you out. Please try again.";
      addToast({ variant: "error", title: "Clock out failed", description: message });
      setClockModal("none");
    },
  );

  const handleClockIn = async () => {
    if (Number.isNaN(jobId) || isLocked) return;
    setClockModal("clocking-in");
    try {
      const position = await getCurrentPosition();
      checkInMutate({
        job_id: jobId,
        current_location_gps_lat: position.coords.latitude,
        current_location_gps_lng: position.coords.longitude,
      });
    } catch {
      setClockModal("not-at-site");
    }
  };

  const handleClockOutClick = () => {
    if (isLocked) return;
    const allChecked =
      activeChecklist.length > 0 && activeChecklist.every((entry) => entry.checked);
    setClockModal(allChecked ? "about-to-clock-out" : "cannot-clock-out");
  };

  const handleConfirmClockOut = async () => {
    if (Number.isNaN(jobId) || isLocked) return;
    setClockModal("clocking-out");
    try {
      const position = await getCurrentPosition();
      checkOutMutate({
        job_id: jobId,
        current_location_gps_lat: position.coords.latitude,
        current_location_gps_lng: position.coords.longitude,
        checklist: activeChecklist,
      });
    } catch {
      addToast({
        variant: "error",
        title: "Location required",
        description: "Enable location access to clock out.",
      });
      setClockModal("none");
    }
  };

  const closeClockModal = () => setClockModal("none");
  const seeOtherJobs = () => {
    setClockModal("none");
    router.push("/jobs");
  };

  // Clicking "Damages" opens the list first; "Make New Report" from there
  // opens the report form on top of it, and clicking a row opens its
  // read-only detail on top of it. All three are mutually exclusive.
  const [damagesListOpen, setDamagesListOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [viewingDamage, setViewingDamage] = useState<Damage | null>(null);

  const invalidateDamages = () => {
    queryClient.invalidateQueries({ queryKey: ["damages", jobId] });
    invalidateJob();
  };

  const { data: damagesList, isLoading: isLoadingDamages } = useGetDamages(
    jobId,
    damagesListOpen,
  );

  const { mutate: reportDamageMutate, isPending: isReportingDamage } = useReportDamage(
    () => {
      addToast({
        variant: "success",
        title: "Damage reported",
        description: "Your report has been submitted.",
      });
      invalidateDamages();
      setReportModalOpen(false);
    },
    (e: any) => {
      const detail = e?.response?.data?.detail;
      const message =
        typeof detail === "string" && detail
          ? detail
          : "Could not submit your report. Please try again.";
      addToast({ variant: "error", title: "Report failed", description: message });
    },
  );

  const { mutate: deleteDamageMutate, isPending: isDeletingDamage } = useDeleteDamage(
    () => {
      addToast({
        variant: "success",
        title: "Damage deleted",
        description: "The damage report was removed.",
      });
      invalidateDamages();
    },
    (e: any) => {
      const detail = e?.response?.data?.detail;
      const message =
        typeof detail === "string" && detail
          ? detail
          : "Could not delete this report. Please try again.";
      addToast({ variant: "error", title: "Delete failed", description: message });
    },
  );

  const handleReportDamage = async (data: { description: string; files: File[] }) => {
    if (Number.isNaN(jobId) || isLocked) return;
    try {
      const position = await getCurrentPosition();
      reportDamageMutate({
        job_id: jobId,
        description: data.description,
        current_location_gps_lat: position.coords.latitude,
        current_location_gps_lng: position.coords.longitude,
        files: data.files,
      });
    } catch {
      addToast({
        variant: "error",
        title: "Location required",
        description: "Enable location access to submit this report.",
      });
    }
  };

  const handleDeleteDamage = (damageId: number) => {
    if (isLocked) return;
    deleteDamageMutate({ damage_id: damageId });
  };

  const openDamagesList = () => setDamagesListOpen(true);
  const closeDamagesList = () => setDamagesListOpen(false);
  const openReportModal = () => {
    if (isLocked) return;
    setDamagesListOpen(false);
    setReportModalOpen(true);
  };
  const closeReportModal = () => setReportModalOpen(false);

  const openDamageDetail = (damage: Damage) => {
    setDamagesListOpen(false);
    setViewingDamage(damage);
  };
  const closeDamageDetail = () => {
    setViewingDamage(null);
    setDamagesListOpen(true);
  };
  const handleDeleteViewingDamage = (damageId: number) => {
    handleDeleteDamage(damageId);
    closeDamageDetail();
  };

  const formatted = job
    ? {
        timeRange: `${formatTime(job.scheduled_start)} - ${formatTime(job.scheduled_end)}`,
        jobDate: formatDate(job.scheduled_start),
        jobTime: formatTime(job.scheduled_start),
        duration: formatDuration(job.scheduled_start, job.scheduled_end),
        payout: formatCurrency(job.payout_amount, job.payout_currency),
        availability: job.items_needed_provided ? "Provided" : "Not Provided",
        checkInTime: job.checkin_at || "N/A",
        checkOutTime: job.checkout_at || "N/A",
        checkDuration: formatCheckDuration(job.checkin_at, job.checkout_at),
      }
    : null;

  return {
    jobId,
    job,
    isLoading,
    isError,
    status: normalizedStatus,
    isLocked,
    formatted,
    checklist: activeChecklist,
    checklistPercentage,
    toggleChecklistItem,
    beforePhotos,
    afterPhotos,
    updatePhoto,
    addSlot,
    clockModal,
    isCheckingIn,
    isCheckingOut,
    handleClockIn,
    handleClockOutClick,
    handleConfirmClockOut,
    closeClockModal,
    seeOtherJobs,
    damagesListOpen,
    openDamagesList,
    closeDamagesList,
    damagesList: damagesList ?? [],
    isLoadingDamages,
    handleDeleteDamage,
    isDeletingDamage,
    reportModalOpen,
    openReportModal,
    closeReportModal,
    handleReportDamage,
    isReportingDamage,
    viewingDamage,
    openDamageDetail,
    closeDamageDetail,
    handleDeleteViewingDamage,
  };
};
