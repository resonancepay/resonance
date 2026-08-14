import { useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useGetJob, useReviewJob } from "./jobs.hook";
import { JobDamage } from "../types/job.types";
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

export const useJobDetailsScreen = () => {
  const params = useParams<{ id: string }>();
  const jobId = Number(params.id);
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const { data: job, isLoading, isError } = useGetJob(jobId, !Number.isNaN(jobId));

  // Damages come embedded in the job payload — no separate fetch, just
  // local open/close + selection state for the list/detail modals.
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

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const openReviewModal = () => setReviewModalOpen(true);
  const closeReviewModal = () => setReviewModalOpen(false);

  const [viewRatingModalOpen, setViewRatingModalOpen] = useState(false);
  const openViewRatingModal = () => setViewRatingModalOpen(true);
  const closeViewRatingModal = () => setViewRatingModalOpen(false);

  // There's no confirmed endpoint to fetch a past rating back from the
  // server, so what was just submitted is cached here for "View Rating" to
  // display — real for the rest of this session, empty after a reload.
  const [submittedRating, setSubmittedRating] = useState<{
    star: number;
    feedback: string;
  } | null>(null);

  const { mutate: reviewJobMutate, isPending: isReviewingJob } = useReviewJob(
    () => {
      addToast({
        variant: "success",
        title: "Job reviewed",
        description: "Thanks for rating this job.",
      });
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setReviewModalOpen(false);
    },
    (e: any) => {
      const detail = e?.response?.data?.detail;
      const message =
        typeof detail === "string" && detail
          ? detail
          : "Could not submit your review. Please try again.";
      addToast({ variant: "error", title: "Review failed", description: message });
    },
  );

  // Only star is sent — feedback isn't part of the confirmed review-job
  // payload yet, it's collected purely for the rating UX.
  const handleReviewJob = (data: { star: number; feedback: string }) => {
    if (Number.isNaN(jobId)) return;
    setSubmittedRating(data);
    reviewJobMutate({ job_id: jobId, star: data.star });
  };

  const normalizedStatus = job
    ? job.status.trim().toLowerCase().replace(/\s+/g, "-")
    : "";

  const formatted = job
    ? {
        timeRange: `${formatTime(job.scheduled_start)} - ${formatTime(job.scheduled_end)}`,
        jobDate: formatDate(job.scheduled_start),
        jobTime: formatTime(job.scheduled_start),
        duration: formatDuration(job.scheduled_start, job.scheduled_end),
        payout: formatCurrency(job.payout_amount, job.payout_currency),
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
    formatted,
    damagesListOpen,
    openDamagesList,
    closeDamagesList,
    viewingDamage,
    openDamageDetail,
    closeDamageDetail,
    reviewModalOpen,
    openReviewModal,
    closeReviewModal,
    handleReviewJob,
    isReviewingJob,
    viewRatingModalOpen,
    openViewRatingModal,
    closeViewRatingModal,
    submittedRating,
  };
};
