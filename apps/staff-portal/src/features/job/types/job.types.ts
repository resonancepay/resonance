import { JobStatusValue } from "@resonance/ui/job-status";

export type JobType = JobStatusValue;

export interface PaginationQuery {
  page?: number;
  size?: number;
}

// List item shape — GET /v1/cleaners/jobs (confirmed against Swagger).
// Only the fields shown in the example response are included here; there
// may be more beyond what was screenshotted.
export interface Job {
  job_id: number;
  job_id_display: string;
  status: string;
  address: string;
  site_name: string;
  scheduled_start: string;
  scheduled_end: string;
  uniform_guidelines: string;
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

// Response shape for POST /v1/cleaners/damages (confirmed against Swagger).
export interface Damage {
  damage_id: number;
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

// Single-job detail shape — POST /v1/cleaners/job (confirmed against
// Swagger). scheduled_start/scheduled_end are milliseconds since epoch
// (per the endpoint's own note), unlike the list response's ISO strings.
export interface JobDetails {
  job_id_label: string;
  status: string;
  address: string;
  site_name: string;
  scheduled_start: number;
  scheduled_end: number;
  // "HH:MM AM/PM" — empty string before check-in/check-out has happened.
  checkin_at: string;
  checkout_at: string;
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
