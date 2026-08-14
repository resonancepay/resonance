import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useJob } from "./job.hooks";
import { useJobApproval } from "./useJobApproval";
import { JobDamage } from "../types/job.type";

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

export const useJobDetailsScreen = () => {
  const params = useParams<{ id: string }>();
  const jobId = Number(params.id);

  const { data: job, isLoading, isError } = useJob(jobId, !Number.isNaN(jobId));

  // API sends Title Case with spaces (e.g. "Approved"), so normalize before
  // comparing.
  const isApproved = job
    ? job.status.trim().toLowerCase().replace(/\s+/g, "-") === "approved"
    : false;

  // Read-only — reflects the cleaner's own checklist submission, the admin
  // can't toggle it.
  const checklist = job?.checklist ?? [];

  const completedCount = checklist.filter((entry) => entry.checked).length;
  const percentage = checklist.length
    ? Math.round((completedCount / checklist.length) * 100)
    : 0;

  // Damages already come embedded in the job payload — no separate fetch,
  // just local open/close + selection state for the list/detail modals.
  const [damagesListOpen, setDamagesListOpen] = useState(false);
  const [viewingDamage, setViewingDamage] = useState<JobDamage | null>(null);

  const openDamagesList = () => setDamagesListOpen(true);
  const closeDamagesList = () => setDamagesListOpen(false);
  const openDamageDetail = (damage: JobDamage) => {
    setDamagesListOpen(false);
    setViewingDamage(damage);
  };
  const closeDamageDetail = () => {
    setViewingDamage(null);
    setDamagesListOpen(true);
  };

  const {
    approveModalOpen,
    openApproveModal,
    closeApproveModal,
    handleApprove,
    isApproving,
  } = useJobApproval();

  const [performanceModalOpen, setPerformanceModalOpen] = useState(false);
  const openPerformanceModal = () => setPerformanceModalOpen(true);
  const closePerformanceModal = () => setPerformanceModalOpen(false);

  const formatted = useMemo(() => {
    if (!job) return null;

    return {
      timeRange: `${formatTime(job.scheduled_start)} - ${formatTime(job.scheduled_end)}`,
      jobDate: formatDate(job.scheduled_start),
      jobTime: formatTime(job.scheduled_start),
      duration: formatDuration(job.scheduled_start, job.scheduled_end),
      jobPay: formatCurrency(job.job_amount, job.payout_currency),
      cleanerPay: formatCurrency(job.payout_amount, job.payout_currency),
      availability: job.items_needed_provided ? "Provided" : "Not Provided",
      checkInTime: job.checkin_at || "N/A",
      checkOutTime: job.checkout_at || "N/A",
      checkDuration: formatCheckDuration(job.checkin_at, job.checkout_at),
    };
  }, [job]);

  return {
    jobId,
    job,
    isLoading,
    isError,
    isApproved,
    checklist,
    percentage,
    formatted,
    damagesListOpen,
    openDamagesList,
    closeDamagesList,
    viewingDamage,
    openDamageDetail,
    closeDamageDetail,
    approveModalOpen,
    openApproveModal: () => openApproveModal(jobId),
    closeApproveModal,
    handleApprove,
    isApproving,
    performanceModalOpen,
    openPerformanceModal,
    closePerformanceModal,
  };
};
