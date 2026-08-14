import { apiClient } from "@/lib/axios";
import {
  Job,
  JobDetails,
  PaginationQuery,
  ReviewJobPayload,
} from "../types/job.types";

// Paths confirmed against Swagger (all live under /client/...). page/size
// on jobs() are assumed, mirroring the confirmed pattern on every other
// list endpoint in this monorepo — not yet individually confirmed here.
export const jobs = async (query: PaginationQuery = {}): Promise<Job[]> => {
  const result = await apiClient.get("/client/jobs", {
    params: { page: query.page ?? 1, size: query.size ?? 10 },
  });
  return result.data;
};

export const job = async (jobId: number): Promise<JobDetails> => {
  const result = await apiClient.post("/client/job", { job_id: jobId });
  return result.data;
};

export const reviewJob = async (payload: ReviewJobPayload) => {
  const result = await apiClient.post("/client/review-job", payload);
  return result.data;
};
