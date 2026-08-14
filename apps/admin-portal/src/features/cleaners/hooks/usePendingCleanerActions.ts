import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/toast";
import { useApproveApplication, useRejectApplication } from "./cleaner.hooks";

export const usePendingCleanerActions = (onActionComplete?: () => void) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const { mutate: approveMutate, isPending: isApproving } = useApproveApplication(
    () => {
      addToast({
        variant: "success",
        title: "Application approved",
        description: "The cleaner has been approved.",
      });
      queryClient.invalidateQueries({ queryKey: ["pending-cleaners"] });
      queryClient.invalidateQueries({ queryKey: ["approved-cleaners"] });
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
        title: "Could not approve application",
        description: message,
      });
    },
  );

  const { mutate: rejectMutate, isPending: isRejecting } = useRejectApplication(
    () => {
      addToast({
        variant: "success",
        title: "Application rejected",
        description: "The cleaner's application has been rejected.",
      });
      queryClient.invalidateQueries({ queryKey: ["pending-cleaners"] });
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
        title: "Could not reject application",
        description: message,
      });
    },
  );

  const handleApprove = (applicationId: number) => {
    approveMutate({ application_id: applicationId });
  };

  const handleReject = (
    applicationId: number,
    data: { reason: string; description: string },
  ) => {
    rejectMutate({ application_id: applicationId, ...data });
  };

  return { handleApprove, handleReject, isApproving, isRejecting };
};
