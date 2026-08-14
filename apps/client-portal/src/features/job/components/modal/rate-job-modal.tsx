"use client";

import { Button, Container, Modal, Text, Textarea } from "@resonance/ui";
import { CheckIcon, InfoIcon, ScoreIcon } from "@resonance/ui/icons";
import { useState } from "react";

const RATING_TRACK: { label: string; filled: number }[] = [
  { label: "Excellent", filled: 5 },
  { label: "Very Good", filled: 4 },
  { label: "Good", filled: 3 },
  { label: "Fair", filled: 2 },
  { label: "Bad", filled: 1 },
];

const StarRow = ({
  filled,
  total = 5,
  size = 20,
  onSelect,
}: {
  filled: number;
  total?: number;
  size?: number;
  onSelect?: (value: number) => void;
}) => (
  <Container className="flex items-center gap-1.5">
    {Array.from({ length: total }).map((_, index) => {
      const value = index + 1;
      return (
        <Container
          key={value}
          as="button"
          type="button"
          disabled={!onSelect}
          onClick={onSelect ? () => onSelect(value) : undefined}
          className={onSelect ? "cursor-pointer" : "cursor-default"}
        >
          <ScoreIcon
            size={size}
            className={value <= filled ? "text-success-text-icons" : "text-tertiary"}
          />
        </Container>
      );
    })}
  </Container>
);

interface RateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { star: number; feedback: string }) => void;
  isPending?: boolean;
}

// Only job_id + star are confirmed against the review-job endpoint — the
// feedback field isn't part of that contract, so it's collected here for a
// better rating UX but isn't sent to the backend yet.
export const RateJobModal = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
}: RateJobModalProps) => {
  const [star, setStar] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState<string | undefined>();

  const handleSubmit = () => {
    if (star === 0) return;
    if (!feedback.trim()) {
      setFeedbackError("Please give feedback to back your rating.");
      return;
    }
    onSubmit({ star, feedback: feedback.trim() });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={420}>
      <Container className="px-2 pt-1 pb-3">
        <Text variant="h5" tone="primary">
          Rate this job
        </Text>
      </Container>

      <Container className="px-2 flex items-center justify-center">
        <Container className="bg-success-bg-light rounded-full px-5 py-3">
          <StarRow filled={star} size={24} onSelect={setStar} />
        </Container>
      </Container>

      <Container className="px-2 mt-4">
        <Textarea
          label="Give a feedback"
          required
          variant2
          placeholder="Give a feedback to back your rating or any other thing to say."
          value={feedback}
          onChange={(e) => {
            setFeedback(e.target.value);
            if (feedbackError) setFeedbackError(undefined);
          }}
          error={feedbackError}
        />
      </Container>

      <Container className="px-2 mt-4">
        <Container className="flex items-center gap-1 mb-2">
          <InfoIcon size={16} className="text-secondary" />
          <Text variant="bodySmall" tone="secondary">
            Rating Track
          </Text>
        </Container>
        <Container className="bg-muted rounded-xl px-3.5 py-1 flex flex-col">
          {RATING_TRACK.map((row) => (
            <Container
              key={row.label}
              className="flex items-center justify-between py-2"
            >
              <Text variant="bodySmall" tone="primary">
                {row.label}
              </Text>
              <StarRow filled={row.filled} size={16} />
            </Container>
          ))}
        </Container>
      </Container>

      <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2 flex gap-2.5">
        <Button className="w-full" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="w-full"
          variant="primary"
          rightIcon={<CheckIcon size={16} className="text-inverted" />}
          onClick={handleSubmit}
          disabled={star === 0 || isPending}
          loading={isPending}
        >
          Save
        </Button>
      </Container>
    </Modal>
  );
};
