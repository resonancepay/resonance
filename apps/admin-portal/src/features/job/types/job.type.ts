import { JobStatusValue } from "@resonance/ui/job-status";

// NOTE: provisional — field names are grounded in staff-portal's real Job
// response and the existing create-job form where they overlap, but haven't
// been confirmed against the actual admin API responses yet. Correct as we
// wire each screen up.

export type JobStatus = JobStatusValue;

export interface JobChecklistItem {
  item: string;
  checked: boolean;
}

export interface Job {
  job_id: string;
  job_id_display: string;
  status: JobStatus;
  site_name: string;
  address: string;
  cleaner_name: string;
  job_type: string;
  scheduled_start: string;
  scheduled_end: string;
  job_pay: number;
  cleaner_pay: number;
  items_needed?: string;
  items_needed_provided: boolean;
  checklist: JobChecklistItem[];
}

export interface JobListResponse {
  data: Job[];
  total: number;
}

export interface JobDetailsPayload {
  job_id: string;
}

export interface CreateJobPayload {
  site_id: number;
  job_pay: number;
  cleaners_pay: number;
  consumables: string;
  consumables_provided: boolean;
  job_date: string;
  start_time: string;
  end_time: string;
  timezone: number;
  assigned_cleaner_id: number;
  checklist: string[];
}

export interface EditJobPayload extends Partial<CreateJobPayload> {
  job_id: string;
}

export interface CancelJobPayload {
  job_id: string;
  reason?: string;
}
