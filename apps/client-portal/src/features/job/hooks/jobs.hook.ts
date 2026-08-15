import { useMutation, useQuery } from "@tanstack/react-query";
import { getJobReview, job, jobs, reviewJob } from "../services/job.service";
import { ReviewJobPayload } from "../types/job.types";

export const useGetJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: () => jobs(),
  });
};

export const useGetJob = (jobId: number, enabled = true) => {
  return useQuery({
    queryKey: ["job", jobId],
    queryFn: () => job(jobId),
    enabled,
  });
};

export const useGetJobReview = (jobId: number, enabled = true) => {
  return useQuery({
    queryKey: ["job-review", jobId],
    queryFn: () => getJobReview({ job_id: jobId }),
    enabled,
    retry: false,
  });
};

export const useReviewJob = (
  sc?: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: ReviewJobPayload) => reviewJob(payload),
    onSuccess: sc,
    onError: ec,
  });
};
