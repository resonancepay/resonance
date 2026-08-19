import { JobStatusValue } from "@resonance/ui/job-status";

export type JobType = JobStatusValue;

export interface PaginationQuery {
  page?: number;
  size?: number;
}

// Confirmed against Swagger — field is job_id_label, not job_id_display.
// scheduled_start/scheduled_end are ISO strings here (list response),
// unlike admin/staff-portal's ms-epoch numbers on their detail responses.
// Cut off after uniform_guidelines in the screenshot — job_type carried
// over from the equivalent staff-portal shape, not yet individually
// confirmed for this endpoint.
export interface Job {
  job_id: number;
  job_id_label: string;
  status: string;
  address: string;
  site_name: string;
  scheduled_start: string;
  scheduled_end: string;
  uniform_guidelines: string;
  job_type: string;
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

export interface JobPerformance {
  score: string;
  flagged: boolean;
  flag_reason: string;
  client_rating: string;
  checklist_completion: string;
  ontime_arrival: string;
}

// Single-job detail shape — POST /client/job (confirmed against Swagger).
// Nearly identical to admin-portal's JobDetails, minus client_name/
// client_email (the client already knows who they are) and job_amount.
// scheduled_start/scheduled_end are milliseconds since epoch here (per the
// endpoint's own note), unlike the list response's ISO strings.
export interface JobDetails {
  job_id_label: string;
  cleaner_id: string;
  cleaner_name: string;
  status: string;
  address: string;
  checkin_at: string;
  checkout_at: string;
  site_name: string;
  scheduled_start: number;
  scheduled_end: number;
  uniform_guidelines: string;
  job_type: string;
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
  performance: JobPerformance;
}

// Confirmed against Swagger (POST /v1/client/job/review) — job_id, star
// (1-5), and feedback are all part of the payload.
export interface ReviewJobPayload {
  job_id: number;
  star: number;
  feedback: string;
}

export interface GetJobReviewPayload {
  job_id: number;
}

// Confirmed against Swagger (POST /v1/client/job/reviews).
export interface JobReview {
  job_id: number;
  star: number;
  feedback: string;
}
