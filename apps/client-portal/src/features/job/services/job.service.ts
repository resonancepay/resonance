import { apiClient } from "@/lib/axios";
import { Job } from "../types/job.types";

export const jobs = async (): Promise<Job[]> => {
  const result = await apiClient.get("/jobs");
  return result.data;
};

export const job = async (jobId: string): Promise<Job> => {
  const result = await apiClient.post(`/jobs`, { job_id: jobId });
  return result.data;
};
