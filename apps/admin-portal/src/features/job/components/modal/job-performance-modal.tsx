"use client";

import { Button, Container, Modal, Text } from "@resonance/ui";
import { JobPerformanceRow } from "../job-performance-row";

interface JobPerformanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  checklistCompletion: number;
}

const toneForPercentage = (percentage: number) => {
  if (percentage < 40) return "danger" as const;
  if (percentage < 70) return "warning" as const;
  return "success" as const;
};

// Checklist Completion is real (derived from the job's own checklist).
// On-Time Arrival and Client Rating have no confirmed data source yet — the
// approve flow captures them at submit time, but nothing returns them back
// on the job afterwards, so they render as "Not yet available" until the
// backend exposes them.
export const JobPerformanceModal = ({
  isOpen,
  onClose,
  checklistCompletion,
}: JobPerformanceModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width={420}>
      <Container className="px-2 pt-1 pb-3">
        <Text variant="h5" tone="primary">
          Job Performance Breakdown
        </Text>
      </Container>

      <Container className="px-2">
        <JobPerformanceRow
          label="Checklist Completion"
          value={`${checklistCompletion}%`}
          percentage={checklistCompletion}
          tone={toneForPercentage(checklistCompletion)}
        />
        <JobPerformanceRow
          label="On-Time Arrival"
          value="Not yet available"
          percentage={0}
          tone="neutral"
        />
        <JobPerformanceRow
          label="Client Rating"
          value="Not yet available"
          percentage={0}
          tone="neutral"
        />
      </Container>

      <Container className="border-t-[0.5px] border-border mt-2 pt-4 px-2 pb-2">
        <Button className="w-full" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
      </Container>
    </Modal>
  );
};
