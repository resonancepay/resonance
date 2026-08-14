import { useParams, useRouter } from "next/navigation";
import { usePendingCleaner } from "./cleaner.hooks";
import { usePendingCleanerActions } from "./usePendingCleanerActions";

export const usePendingCleanerDetailsScreen = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const applicationId = Number(params.id);

  const { data, isLoading, isError } = usePendingCleaner(
    { application_id: applicationId },
    !Number.isNaN(applicationId),
  );

  const { handleApprove, handleReject, isApproving, isRejecting } =
    usePendingCleanerActions(() => router.push("/cleaners/pending-cleaners"));

  return {
    details: data,
    isLoading,
    isError,
    handleApprove: () => handleApprove(applicationId),
    handleReject: (data: { reason: string; description: string }) =>
      handleReject(applicationId, data),
    isApproving,
    isRejecting,
  };
};
