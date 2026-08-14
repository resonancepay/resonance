"use client";

import { Button, Container, Text } from "@resonance/ui";
import { CheckIcon, CloseIcon, JobIcon2 } from "@resonance/ui/icons";
import { useState } from "react";
import { ApproveJobFormData } from "../hooks/useJobApproval";
import { ApproveJobModal } from "./modal/approve-job-modal";
import { CancelJobModal } from "./modal/cancel-job-modal";

interface JobControlProps {
  status: string;
  onEditJob: () => void;
  approveModalOpen: boolean;
  onOpenApprove: () => void;
  onCloseApprove: () => void;
  onApprove: (data: ApproveJobFormData) => void;
  isApproving?: boolean;
}

export const JobControl = ({
  status,
  onEditJob,
  approveModalOpen,
  onOpenApprove,
  onCloseApprove,
  onApprove,
  isApproving,
}: JobControlProps) => {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  // API sends Title Case with spaces (e.g. "Under Review"), so normalize
  // before comparing rather than checking against the raw value.
  const normalized = status.trim().toLowerCase().replace(/\s+/g, "-");
  const isEditable = normalized === "pending" || normalized === "scheduled";
  const isInProgress = normalized === "in-progress";
  const isUnderReview = normalized === "under-review";

  // Damages now has its own always-visible entry point (job-damages.tsx),
  // independent of control state, so statuses with no actionable control
  // (approved, paid, cancelled) render nothing here rather than an empty card.
  if (!isEditable && !isInProgress && !isUnderReview) {
    return null;
  }

  return (
    <>
      <Container className="bg-surface border-[0.5px] border-border p-3.5 rounded-xl">
        <Container className="flex items-center gap-1.5 mb-3">
          <JobIcon2 className="text-secondary" size={16} />
          <Text variant="bodySmall" tone="secondary">
            Job control
          </Text>
        </Container>

        {isEditable && (
          <Container className="flex items-center gap-2.5">
            <Button
              className="flex-1"
              variant="primary"
              rightIcon={<CheckIcon size={16} className="text-inverted" />}
              onClick={onEditJob}
            >
              Edit Job
            </Button>
            <Button
              className="flex-1"
              variant="danger"
              rightIcon={<CloseIcon size={16} className="text-inverted" />}
              onClick={() => setCancelModalOpen(true)}
            >
              Cancel Job
            </Button>
          </Container>
        )}

        {isInProgress && (
          <Button
            className="w-full"
            variant="primary"
            disabled
            rightIcon={<CheckIcon size={16} />}
          >
            Approve Job
          </Button>
        )}

        {isUnderReview && (
          <Button
            className="w-full"
            variant="primary"
            rightIcon={<CheckIcon size={16} className="text-inverted" />}
            onClick={onOpenApprove}
          >
            Approve Job
          </Button>
        )}
      </Container>

      <CancelJobModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onCancelJob={() => setCancelModalOpen(false)}
      />

      <ApproveJobModal
        isOpen={approveModalOpen}
        onClose={onCloseApprove}
        onApprove={onApprove}
        isPending={isApproving}
      />
    </>
  );
};
