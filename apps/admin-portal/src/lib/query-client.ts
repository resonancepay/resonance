import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // 5 minutes — data stays fresh before refetching
      retry: 1,                   // retry failed requests once before throwing
      refetchOnWindowFocus: false, // don't refetch just because user switched tabs
    },
    mutations: {
      retry: 0, // never retry failed mutations
    },
  },
});
