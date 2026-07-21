import { JobStatusValue } from "@resonance/ui/job-status";

export type JobType = JobStatusValue;

export interface Job {
  job_id_display: string;
  status: string;
  address: string;
  site_name: string;
  scheduled_start: string;
  scheduled_end: string;
  uniform_guidelines: string;
  job_type: string;
  payout_amount: number;
  payout_currency: string;
  cleaning_location: {
    lat: string;
    lng: string;
  };
  before_images: string[];
  after_images: string[];
  items_needed: string;
  items_needed_provided: true;
  checklist: [
    {
      item: string;
      checked: boolean;
    },
  ];
}
