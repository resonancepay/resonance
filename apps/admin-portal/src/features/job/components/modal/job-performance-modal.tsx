"use client";

import { Button, Container, Modal, Text } from "@resonance/ui";
import { JobPerformanceRow } from "../job-performance-row";
import { JobPerformance } from "../../types/job.type";

interface JobPerformanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  performance: JobPerformance;
}

const toneForPercentage = (percentage: number) => {
  if (percentage < 40) return "danger" as const;
  if (percentage < 70) return "warning" as const;
  return "success" as const;
};

// checklist_completion/ontime_arrival come back as percentage strings
// ("0%"), client_rating as a "x/5" ratio — parsed here just to drive each
// row's progress bar fill, the raw string is still shown as the value.
const parsePercentValue = (value: string) => {
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const parseRatioAsPercentage = (value: string) => {
  const match = value.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
  if (!match) return 0;
  const numerator = Number(match[1]);
  const denominator = Number(match[2]);
  return denominator ? Math.round((numerator / denominator) * 100) : 0;
};

export const JobPerformanceModal = ({
  isOpen,
  onClose,
  performance,
}: JobPerformanceModalProps) => {
  const checklistPercentage = parsePercentValue(
    performance.checklist_completion,
  );
  const ontimePercentage = parsePercentValue(performance.ontime_arrival);
  const ratingPercentage = parseRatioAsPercentage(performance.client_rating);

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
          value={performance.checklist_completion}
          percentage={checklistPercentage}
          tone={toneForPercentage(checklistPercentage)}
        />
        <JobPerformanceRow
          label="On-Time Arrival"
          value={performance.ontime_arrival}
          percentage={ontimePercentage}
          tone={toneForPercentage(ontimePercentage)}
        />
        <JobPerformanceRow
          label="Client Rating"
          value={performance.client_rating}
          percentage={ratingPercentage}
          tone={toneForPercentage(ratingPercentage)}
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
