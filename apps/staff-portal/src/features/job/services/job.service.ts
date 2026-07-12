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

export interface UploadJobPicturePayload {
  job_id: number;
  direction: 1 | 2;
  current_location_gps_lat: number;
  current_location_gps_lng: number;
  file: File;
}

export const uploadJobPicture = async (payload: UploadJobPicturePayload) => {
  const formData = new FormData();
  formData.append("file", payload.file);

  const result = await apiClient.post(
    `/take-picture?job_id=${payload.job_id}&direction=${payload.direction}&current_location_gps_lat=${payload.current_location_gps_lat}&current_location_gps_lng=${payload.current_location_gps_lng}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return result.data;
};
