// NOTE: Job (the list item shape), JobDetails (single-job response),
// CreateJobPayload, and EditJobPayload are all confirmed against the real
// API. job_date is YYYY-MM-DD, start_time/end_time are 24hr HH:MM, timezone
// is a plain UTC-hour offset (-12 to +12). Cancel payload is still
// provisional.
//
// status is a plain string, not the shared JobStatusValue union — the API
// sends Title Case with spaces (e.g. "Under Review"), not the config's
// lowercase-hyphenated keys, so components normalize before lookup.

export interface Job {
  job_id: number;
  job_id_label: string;
  status: string;
  address: string;
  site_name: string;
  cleaner_name: string;
  job_type: string;
  job_date: string;
  job_time: string;
}

export type JobListResponse = Job[];

export interface JobDetailsPayload {
  job_id: number;
}

export interface JobImage {
  image: string;
  gps_lat: string;
  gps_lng: string;
  timestamp: string;
}

export interface JobDamage {
  description: string;
  images: string[];
}

export interface JobChecklistEntry {
  item: string;
  checked: boolean;
}

export interface JobDetails {
  job_id_label: string;
  cleaner_id: string;
  cleaner_name: string;
  client_name: string;
  client_email: string;
  status: string;
  address: string;
  checkin_at: string;
  checkout_at: string;
  site_name: string;
  // milliseconds since epoch
  scheduled_start: number;
  scheduled_end: number;
  uniform_guidelines: string;
  job_type: string;
  job_amount: number;
  payout_amount: number;
  payout_currency: string;
  cleaning_location: {
    lat: string;
    lng: string;
  };
  before_images: JobImage[];
  after_images: JobImage[];
  damages: JobDamage[];
  items_needed: string;
  items_needed_provided: boolean;
  checklist: JobChecklistEntry[];
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

export interface EditJobPayload extends CreateJobPayload {
  job_id: number;
}

export interface CancelJobPayload {
  job_id: number;
  reason?: string;
}

export interface ApproveJobPayload {
  job_id: number;
  checklist_completion: number;
  ontime_arrival: number;
  flagged: boolean;
  flagged_reason: string;
}

export interface ApproveJobResponse {
  success: boolean;
  detail: string;
}
