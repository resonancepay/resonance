import { useJobs } from "./job.hooks";
import { useJobApproval } from "./useJobApproval";

export const useJobListScreen = () => {
  const { data, isLoading, isError } = useJobs();
  const {
    approveModalOpen,
    openApproveModal,
    closeApproveModal,
    handleApprove,
    isApproving,
  } = useJobApproval();

  const jobs = data ?? [];

  return {
    jobs,
    isLoading,
    isError,
    count: jobs.length,
    approveModalOpen,
    openApproveModal,
    closeApproveModal,
    handleApprove,
    isApproving,
  };
};
