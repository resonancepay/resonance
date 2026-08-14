import { useApprovedCleaners } from "./cleaner.hooks";

// Same note as usePendingCleanersScreen — server paginates but the response
// carries no total count, so we fetch the max page size and let DataTable
// paginate client-side.
export const useApprovedCleanersScreen = () => {
  const { data, isLoading, isError } = useApprovedCleaners({ page: 1, size: 100 });

  const cleaners = data ?? [];

  return {
    cleaners,
    isLoading,
    isError,
    count: cleaners.length,
  };
};
