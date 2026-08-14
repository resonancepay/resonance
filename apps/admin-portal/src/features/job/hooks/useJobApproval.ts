import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/toast";
import { useApproveJob } from "./job.hooks";

export interface ApproveJobFormData {
  checklistCompletion: number;
  ontimeArrival: number;
  flagged: boolean;
  flaggedReason: string;
}

// Shared between the job details screen's "Approve Job" button and the job
// list table's row-level "Approve" action — same modal, same mutation.
export const useJobApproval = (onActionComplete?: () => void) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const [approvingJobId, setApprovingJobId] = useState<number | null>(null);

  const { mutate, isPending: isApproving } = useApproveJob(
    () => {
      addToast({
        variant: "success",
        title: "Job approved",
        description: "The job has been approved.",
      });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      if (approvingJobId !== null) {
        queryClient.invalidateQueries({ queryKey: ["job", approvingJobId] });
      }
      setApprovingJobId(null);
      onActionComplete?.();
    },
    (e: any) => {
      const detail = e?.response?.data?.detail;
      const message =
        typeof detail === "string" && detail
          ? detail
          : "Something went wrong. Please try again.";

      addToast({
        variant: "error",
        title: "Could not approve job",
        description: message,
      });
    },
  );

  const openApproveModal = (jobId: number) => setApprovingJobId(jobId);
  const closeApproveModal = () => setApprovingJobId(null);

  const handleApprove = (data: ApproveJobFormData) => {
    if (approvingJobId === null) return;
    mutate({
      job_id: approvingJobId,
      checklist_completion: data.checklistCompletion,
      ontime_arrival: data.ontimeArrival,
      flagged: data.flagged,
      flagged_reason: data.flaggedReason,
    });
  };

  return {
    approveModalOpen: approvingJobId !== null,
    openApproveModal,
    closeApproveModal,
    handleApprove,
    isApproving,
  };
};
