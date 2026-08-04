import { useQuery } from "@tanstack/react-query";
import { job, jobs } from "../services/job.service";

export const useGetJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: jobs,
  });
};

export const useGetJob = (jobId: string) => {
  return useQuery({
    queryKey: ["jobs", jobId],
    queryFn: () => job(jobId),
    enabled: !!jobId,
  });
};
