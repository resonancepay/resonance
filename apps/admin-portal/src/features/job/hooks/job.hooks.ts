import { useMutation, useQuery } from "@tanstack/react-query";
import {
  approveJob,
  cancelJob,
  createJob,
  editJob,
  editPublishJob,
  exportJobs,
  getJob,
  getJobs,
  publishJob,
} from "../services/job.service";
import {
  ApproveJobPayload,
  ApproveJobResponse,
  CancelJobPayload,
  CreateJobPayload,
  EditJobPayload,
  EditPublishJobPayload,
  Job,
  PublishJobPayload,
  PublishJobResponse,
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

export const usePublishJob = (
  sc: (val: PublishJobResponse) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: PublishJobPayload) => publishJob(payload),
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

export const useEditPublishJob = (
  sc: (val: unknown) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: EditPublishJobPayload) => editPublishJob(payload),
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
