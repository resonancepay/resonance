import { Container, Text } from "@resonance/ui";
import { DangerIcon, SuccessIcon } from "@resonance/ui/icons";
import {
  JOB_STATUS_CONFIG,
  JobStatusColor,
  JobStatusValue,
} from "@resonance/ui/job-status";
import React from "react";

// Cleaner-only statuses (not part of the shared Job status vocabulary).
const CLEANER_STATUS_CONFIG = {
  rejected: {
    label: "Rejected",
    bg: "bg-danger-bg-bold",
    icon: DangerIcon,
  },
  approved: {
    label: "Approved",
    bg: "bg-success-bg-bold",
    icon: SuccessIcon,
  },
  active: {
    label: "Active",
    bg: "bg-success-bg-bold",
    icon: SuccessIcon,
  },
  suspended: {
    label: "Suspended",
    bg: "bg-danger-bg-bold",
    icon: DangerIcon,
  },
} as const;

// Tailwind's scanner needs literal class strings, so a color family from the
// shared config is looked up here rather than interpolated into a class name.
const BOLD_BG_CLASS: Record<JobStatusColor, string> = {
  warning: "bg-warning-bg-bold",
  purple: "bg-purple-bg-bold",
  blue: "bg-blue-bg-bold",
  "yinmn-blue": "bg-yinmn-blue-bg-bold",
  success: "bg-success-bg-bold",
  danger: "bg-danger-bg-bold",
};

// Job statuses come from the shared package so admin-portal and
// staff-portal never drift on what each status means or looks like.
const JOB_STATUS_ENTRIES = Object.fromEntries(
  (Object.keys(JOB_STATUS_CONFIG) as JobStatusValue[]).map((status) => {
    const { label, color, icon } = JOB_STATUS_CONFIG[status];
    return [status, { label, bg: BOLD_BG_CLASS[color], icon }];
  }),
) as Record<
  JobStatusValue,
  { label: string; bg: string; icon: (typeof JOB_STATUS_CONFIG)[JobStatusValue]["icon"] }
>;

const STATUS_CONFIG = {
  ...CLEANER_STATUS_CONFIG,
  ...JOB_STATUS_ENTRIES,
};

export const TableStatus = ({
  status,
}: {
  status: string;
}) => {
  // API casing/spacing isn't consistent (e.g. "Pending" vs "pending", "Under
  // Review" vs the config's "under-review" key), so normalize both before
  // the lookup rather than silently rendering nothing on a mismatch.
  const normalized = status
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") as keyof typeof STATUS_CONFIG;

  if (!(normalized in STATUS_CONFIG)) return null;

  const { label, bg, icon: Icon } = STATUS_CONFIG[normalized];

  return (
    <Container className={`px-1 py-0.5 inline-flex rounded-full ${bg}`}>
      <Container className="flex items-center gap-1.5">
        <Icon size={16} className="text-inverted" />
        <Text variant="buttonXS" tone="inverted">
          {label}
        </Text>
      </Container>
    </Container>
  );
};
