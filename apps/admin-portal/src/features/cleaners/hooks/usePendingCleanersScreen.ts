import { usePendingCleaners } from "./cleaner.hooks";
import { usePendingCleanerActions } from "./usePendingCleanerActions";

// Server paginates (page/size), but the response carries no total count to
// build real server-side pagination against — fetching the max page size
// and letting DataTable paginate client-side, same as jobs/sites do today.
export const usePendingCleanersScreen = () => {
  const { data, isLoading, isError } = usePendingCleaners({ page: 1, size: 100 });
  const { handleApprove, handleReject, isApproving, isRejecting } =
    usePendingCleanerActions();

  const cleaners = data ?? [];

  return {
    cleaners,
    isLoading,
    isError,
    count: cleaners.length,
    handleApprove,
    handleReject,
    isApproving,
    isRejecting,
  };
};
