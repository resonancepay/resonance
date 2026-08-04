import { JobStatusValue } from "@resonance/ui/job-status";

export type JobType = JobStatusValue;

export interface Job {
  job_id_display: string;
  status: string;
  address: string;
  site_name: string;
  scheduled_start: string;
  scheduled_end: string;
  job_type: string;
}
