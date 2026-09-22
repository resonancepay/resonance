import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  checkIn,
  CheckInPayload,
  checkOut,
  CheckOutPayload,
  deleteDamage,
  DeleteDamagePayload,
  deleteJobPicture,
  DeleteJobPicturePayload,
  DeleteJobPictureResponse,
  getDamages,
  job,
  jobs,
  openJobs,
  reportDamage,
  ReportDamagePayload,
  uploadJobPicture,
  UploadJobPicturePayload,
} from "../services/job.service";

export const useGetJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: () => jobs(),
  });
};

export const OPEN_JOBS_PAGE_SIZE = 10;

// The open-jobs response has no total count, so a page that comes back
// shorter than the page size is taken to be the last one.
export const useOpenJobs = () => {
  return useInfiniteQuery({
    queryKey: ["jobs", "open"],
    queryFn: ({ pageParam }) =>
      openJobs({ page: pageParam, size: OPEN_JOBS_PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < OPEN_JOBS_PAGE_SIZE ? undefined : allPages.length + 1,
  });
};

export const useGetJob = (jobId: number, enabled = true) => {
  return useQuery({
    queryKey: ["job", jobId],
    queryFn: () => job(jobId),
    enabled,
  });
};

export const useUploadJobPicture = (
  sc?: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: UploadJobPicturePayload) => uploadJobPicture(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useDeleteJobPicture = (
  sc?: (val: DeleteJobPictureResponse) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: DeleteJobPicturePayload) => deleteJobPicture(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useCheckIn = (
  sc?: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: CheckInPayload) => checkIn(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useCheckOut = (
  sc?: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: CheckOutPayload) => checkOut(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useReportDamage = (
  sc?: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: ReportDamagePayload) => reportDamage(payload),
    onSuccess: sc,
    onError: ec,
  });
};

// A fetch-on-open list, not a one-off action, so this follows the same
// POST-used-as-GET query pattern as useGetJob rather than useMutation.
export const useGetDamages = (jobId: number, enabled = true) => {
  return useQuery({
    queryKey: ["damages", jobId],
    queryFn: () => getDamages({ job_id: jobId }),
    enabled,
  });
};

export const useDeleteDamage = (
  sc?: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: DeleteDamagePayload) => deleteDamage(payload),
    onSuccess: sc,
    onError: ec,
  });
};
