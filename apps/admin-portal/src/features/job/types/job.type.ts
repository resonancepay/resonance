// NOTE: Job (the list item shape), JobDetails (single-job response),
// CreateJobPayload, EditJobPayload, and PublishJobPayload are all confirmed
// against the real API. job_date is YYYY-MM-DD, start_time/end_time are 24hr HH:MM, timezone
// is a plain UTC-hour offset (-12 to +12). Cancel payload is still
// provisional.
//
// status is a plain string, not the shared JobStatusValue union — the API
// sends Title Case with spaces (e.g. "Under Review"), not the config's
// lowercase-hyphenated keys, so components normalize before lookup.

import { ApprovedCleaner } from "@/features/cleaners/types/cleaner.type";
import { ChangeEvent } from "react";

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

export interface JobPerformance {
  score: string;
  flagged: boolean;
  flag_reason: string;
  client_rating: string;
  checklist_completion: string;
  ontime_arrival: string;
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
  performance: JobPerformance;
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

// Confirmed against Swagger — POST /v1/admin/job/publish. Used when the job
// is published for cleaners to claim rather than assigned to one, so there's
// no assigned_cleaner_id; instead there's a claim deadline and the radius
// (miles from the site) within which cleaners are eligible. deadline_date is
// YYYY-MM-DD and deadline_time is 24hr HH:MM, like the job date/times.
export interface PublishJobPayload {
  site_id: number;
  job_pay: number;
  cleaners_pay: number;
  consumables: string;
  consumables_provided: boolean;
  job_date: string;
  start_time: string;
  end_time: string;
  deadline_date: string;
  deadline_time: string;
  timezone: number;
  radius: number;
  checklist: string[];
}

// Confirmed against Swagger — POST /v1/admin/job/edit-publish: the publish
// payload plus the id of the published job being edited.
export interface EditPublishJobPayload extends PublishJobPayload {
  job_id: number;
}

export interface PublishJobResponse {
  success: boolean;
  job_id: number;
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


export interface JobThirdStepProps {
  selected: string[];
  error?: string;
  isPending?: boolean;
  onToggle: (id: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

export type AssignmentType = "publish" | "assign";

export type AssignmentField =
  | "deadlineDate"
  | "deadlineTime"
  | "eligibleRadius"
  | "assignedCleaner";

export interface JobAssignmentStepValues {
  assignmentType: AssignmentType;
  deadlineDate: string;
  deadlineTime: string;
  eligibleRadius: string;
  assignedCleaner: string;
}

export interface JobAssignmentStepProps {
  // Hides the publish/assign choice and shows only that type's conditions —
  // used when editing a job, which keeps whichever type it already is.
  lockedType?: AssignmentType;
  values: JobAssignmentStepValues;
  errors: Partial<Record<AssignmentField, string>>;
  cleaners: ApprovedCleaner[];
  heading?: string;
  onAssignmentTypeChange: (type: AssignmentType) => void;
  onDeadlineDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeadlineTimeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEligibleRadiusChange: (id: string) => void;
  onAssignedCleanerChange: (cleanerId: string) => void;
  onCancel: () => void;
  onContinue: () => void;
}

export interface Option {
  label: string;
  value: string;
}

export interface JobFirstStepValues {
  cleaningSite: string;
  jobPay: string;
  cleanerPay: string;
  consumables: string;
  consumablesProvidedByCustomer: boolean;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
}

export type TextField = "jobPay" | "cleanerPay" | "consumables" | "date";
export type SelectField = "cleaningSite" | "startTime" | "endTime" | "timezone";

export type FirstStepErrors = Partial<Record<keyof JobFirstStepValues, string>>;

export interface JobFirstStepProps {
  values: JobFirstStepValues;
  errors: Partial<Record<keyof JobFirstStepValues, string>>;
  siteOptions: Option[];
  timeOptions: Option[];
  timezoneOptions: Option[];
  heading?: string;
  onChange: (field: TextField) => (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (field: SelectField) => (value?: string) => void;
  onConsumablesProvidedChange: (checked: boolean) => void;
  onCancel: () => void;
  onContinue: () => void;
}