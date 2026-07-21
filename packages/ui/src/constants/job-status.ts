import { ComponentType, SVGProps } from "react";
import {
  ClockIcon,
  DangerIcon,
  InactiveIcon,
  InProgressIcon,
  PendingIcon,
  SuccessIcon,
} from "../icons";

export type JobStatusValue =
  | "pending"
  | "scheduled"
  | "in-progress"
  | "under-review"
  | "paid"
  | "cancelled";

export type JobStatusColor =
  | "warning"
  | "purple"
  | "blue"
  | "yinmn-blue"
  | "success"
  | "danger";

export interface JobStatusMeta {
  label: string;
  color: JobStatusColor;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
}

// Single source of truth for Job status label/color/icon — consumed by both
// admin-portal (bold pill) and staff-portal (light pill) so the two apps
// never drift on what each Job status means or looks like.
export const JOB_STATUS_CONFIG: Record<JobStatusValue, JobStatusMeta> = {
  pending: {
    label: "Pending",
    color: "warning",
    icon: PendingIcon,
  },
  scheduled: {
    label: "Scheduled",
    color: "purple",
    icon: ClockIcon,
  },
  "in-progress": {
    label: "In Progress",
    color: "blue",
    icon: InProgressIcon,
  },
  "under-review": {
    label: "Under Review",
    color: "yinmn-blue",
    icon: InactiveIcon,
  },
  paid: {
    label: "Paid",
    color: "success",
    icon: SuccessIcon,
  },
  cancelled: {
    label: "Cancelled",
    color: "danger",
    icon: DangerIcon,
  },
};
