import { Container, Text } from "@resonance/ui";
import {
  DangerIcon,
  InfoIcon,
  InProgressIcon,
  MinusIcon,
  PendingIcon,
  SuccessIcon,
} from "@resonance/ui/icons";
import React from "react";

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    bg: "bg-warning-bg-bold",
    icon: PendingIcon,
  },
  rejected: {
    label: "Rejected",
    bg: "bg-danger-bg-bold",
    icon: DangerIcon,
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
  scheduled: {
    label: "Scheduled",
    bg: "bg-indigo-bg-bold",
    icon: InfoIcon,
  },
  "in-progress": {
    label: "In Progress",
    bg: "bg-blue-bg-bold",
    icon: InProgressIcon,
  },
  review: {
    label: "Review",
    bg: "bg-yinmn-blue-bg-bold",
    icon: MinusIcon,
  },
  approved: {
    label: "Approved",
    bg: "bg-success-bg-bold",
    icon: SuccessIcon,
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-danger-bg-bold",
    icon: DangerIcon,
  },
} as const;

export const TableStatus = ({
  status,
}: {
  status:
    | "pending"
    | "rejected"
    | "active"
    | "suspended"
    | "approved"
    | "scheduled"
    | "in-progress"
    | "review"
    | "cancelled";
}) => {
  if (!(status in STATUS_CONFIG)) return null;

  const { label, bg, icon: Icon } = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];

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
