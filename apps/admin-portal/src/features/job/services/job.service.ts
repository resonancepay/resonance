import { apiClient } from "@/lib/axios";
import {
  CancelJobPayload,
  CreateJobPayload,
  EditJobPayload,
  Job,
  JobDetailsPayload,
  JobListResponse,
} from "../types/job.type";

// NOTE: request/response shapes are provisional (see job.type.ts) — paths
// and HTTP methods match the API docs, payload fields need confirming.

export const getJobs = async (): Promise<JobListResponse> => {
  const result = await apiClient.get("/v1/admin/jobs");
  return result.data;
};

export const getJob = async (payload: JobDetailsPayload): Promise<Job> => {
  const result = await apiClient.post("/v1/admin/job", payload);
  return result.data;
};

export const createJob = async (payload: CreateJobPayload): Promise<Job> => {
  const result = await apiClient.post("/v1/admin/job/create", payload);
  return result.data;
};

export const editJob = async (payload: EditJobPayload): Promise<Job> => {
  const result = await apiClient.post("/v1/admin/job/edit", payload);
  return result.data;
};

export const cancelJob = async (payload: CancelJobPayload): Promise<Job> => {
  const result = await apiClient.post("/v1/admin/job/cancel", payload);
  return result.data;
};

export const exportJobs = async (): Promise<Blob> => {
  const result = await apiClient.get("/v1/admin/jobs/export", {
    responseType: "blob",
  });
  return result.data;
};
