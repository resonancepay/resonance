import { apiClient } from "@/lib/axios";
import {
  ApproveJobPayload,
  ApproveJobResponse,
  CancelJobPayload,
  CreateJobPayload,
  EditJobPayload,
  Job,
  JobDetails,
  JobDetailsPayload,
  JobListResponse,
} from "../types/job.type";

// NOTE: getJobs, getJob, createJob, and editJob request/response shapes are
// confirmed (see job.type.ts). cancelJob's response is still unconfirmed.

export const getJobs = async (): Promise<JobListResponse> => {
  const result = await apiClient.get("/admin/jobs?page=1&size=100");
  return result.data;
};

export const getJob = async (
  payload: JobDetailsPayload,
): Promise<JobDetails> => {
  const result = await apiClient.post("/admin/job", payload);
  return result.data;
};

export const createJob = async (payload: CreateJobPayload): Promise<Job> => {
  const result = await apiClient.post("/admin/job/create", payload);
  return result.data;
};

export const editJob = async (payload: EditJobPayload): Promise<Job> => {
  const result = await apiClient.post("/admin/job/edit", payload);
  return result.data;
};

export const cancelJob = async (payload: CancelJobPayload): Promise<Job> => {
  const result = await apiClient.post("/admin/job/cancel", payload);
  return result.data;
};

export const approveJob = async (
  payload: ApproveJobPayload,
): Promise<ApproveJobResponse> => {
  const result = await apiClient.post("/admin/job/approve", payload);
  return result.data;
};

export const exportJobs = async (): Promise<Blob> => {
  const result = await apiClient.get("/admin/jobs/export", {
    responseType: "blob",
  });
  return result.data;
};
