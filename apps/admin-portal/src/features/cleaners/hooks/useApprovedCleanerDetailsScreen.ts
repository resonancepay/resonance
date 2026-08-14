import { useParams } from "next/navigation";
import { useApprovedCleaner } from "./cleaner.hooks";

export const useApprovedCleanerDetailsScreen = () => {
  const params = useParams<{ id: string }>();
  const applicationId = Number(params.id);

  const { data, isLoading, isError } = useApprovedCleaner(
    { application_id: applicationId },
    !Number.isNaN(applicationId),
  );

  return {
    details: data,
    isLoading,
    isError,
  };
};
