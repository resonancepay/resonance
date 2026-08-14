import { apiClient } from "@/lib/axios";
import {
  Damage,
  Job,
  JobChecklistEntry,
  JobDetails,
  PaginationQuery,
} from "../types/job.types";

// Paths are confirmed against Swagger (all live under /cleaners/...).

export const jobs = async (query: PaginationQuery = {}): Promise<Job[]> => {
  const result = await apiClient.get("/cleaners/jobs", {
    params: { page: query.page ?? 1, size: query.size ?? 10 },
  });
  return result.data;
};

export const job = async (jobId: number): Promise<JobDetails> => {
  const result = await apiClient.post("/cleaners/job", { job_id: jobId });
  return result.data;
};

export interface UploadJobPicturePayload {
  job_id: number;
  description: string;
  direction: 1 | 2;
  current_location_gps_lat: number;
  current_location_gps_lng: number;
  file: File;
}

export const uploadJobPicture = async (payload: UploadJobPicturePayload) => {
  const formData = new FormData();
  formData.append("file", payload.file);

  const params = new URLSearchParams({
    job_id: String(payload.job_id),
    description: payload.description,
    direction: String(payload.direction),
    current_location_gps_lat: String(payload.current_location_gps_lat),
    current_location_gps_lng: String(payload.current_location_gps_lng),
  });

  const result = await apiClient.post(
    `/cleaners/take-picture?${params.toString()}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return result.data;
};

export interface DeleteJobPicturePayload {
  job_id: number;
  image_url: string;
  direction: 1 | 2;
}

export interface DeleteJobPictureResponse {
  success: boolean;
  detail: string;
}

export const deleteJobPicture = async (
  payload: DeleteJobPicturePayload,
): Promise<DeleteJobPictureResponse> => {
  const result = await apiClient.post("/cleaners/picture/delete", payload);
  return result.data;
};

export interface CheckInPayload {
  job_id: number;
  current_location_gps_lat: number;
  current_location_gps_lng: number;
}

export const checkIn = async (payload: CheckInPayload) => {
  const result = await apiClient.post("/cleaners/check-in", payload);
  return result.data;
};

export interface CheckOutPayload {
  job_id: number;
  current_location_gps_lat: number;
  current_location_gps_lng: number;
  checklist: JobChecklistEntry[];
}

export const checkOut = async (payload: CheckOutPayload) => {
  const result = await apiClient.post("/cleaners/check-out", payload);
  return result.data;
};

export interface ReportDamagePayload {
  job_id: number;
  description: string;
  current_location_gps_lat: number;
  current_location_gps_lng: number;
  files: File[];
}

export const reportDamage = async (payload: ReportDamagePayload) => {
  const formData = new FormData();
  payload.files.forEach((file) => formData.append("files", file));
  formData.append("job_id", String(payload.job_id));
  formData.append("description", payload.description);
  formData.append(
    "current_location_gps_lat",
    String(payload.current_location_gps_lat),
  );
  formData.append(
    "current_location_gps_lng",
    String(payload.current_location_gps_lng),
  );

  const result = await apiClient.post("/cleaners/damage/report", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return result.data;
};

export interface GetDamagesPayload {
  job_id: number;
}

export const getDamages = async (
  payload: GetDamagesPayload,
): Promise<Damage[]> => {
  const result = await apiClient.post("/cleaners/damages", payload);
  return result.data;
};

export interface DeleteDamagePayload {
  damage_id: number;
}

export const deleteDamage = async (payload: DeleteDamagePayload) => {
  const result = await apiClient.post("/cleaners/damage/delete", payload);
  return result.data;
};
