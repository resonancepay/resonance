import { useMutation, useQuery } from "@tanstack/react-query";
import {
  approveJob,
  cancelJob,
  createJob,
  editJob,
  exportJobs,
  getJob,
  getJobs,
} from "../services/job.service";
import {
  ApproveJobPayload,
  ApproveJobResponse,
  CancelJobPayload,
  CreateJobPayload,
  EditJobPayload,
  Job,
} from "../types/job.type";

export const useJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });
};

export const useJob = (jobId: number, enabled = true) => {
  return useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJob({ job_id: jobId }),
    enabled,
  });
};

export const useCreateJob = (
  sc: (val: Job) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: CreateJobPayload) => createJob(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useEditJob = (
  sc: (val: Job) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: EditJobPayload) => editJob(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useCancelJob = (
  sc: (val: Job) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: CancelJobPayload) => cancelJob(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useApproveJob = (
  sc: (val: ApproveJobResponse) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: ApproveJobPayload) => approveJob(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useExportJobs = (
  sc: (val: Blob) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: () => exportJobs(),
    onSuccess: sc,
    onError: ec,
  });
};
