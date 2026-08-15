"use client";

import { Button, Container, Modal, Text, Textarea } from "@resonance/ui";
import { ScoreIcon } from "@resonance/ui/icons";

const TIER_LABELS: Record<number, string> = {
  5: "Excellent",
  4: "Very Good",
  3: "Good",
  2: "Fair",
  1: "Bad",
};

interface ViewRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  star: number;
  feedback: string;
}

// Read-only — shows the review fetched from POST /client/job/reviews.
export const ViewRatingModal = ({
  isOpen,
  onClose,
  star,
  feedback,
}: ViewRatingModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width={420}>
      <Container className="px-2 pt-1 pb-3">
        <Text variant="h5" tone="primary">
          Your rating for this job/cleaner
        </Text>
      </Container>

      <Container className="px-2 flex flex-col items-center gap-2">
        <Container className="bg-success-bg-light rounded-full px-5 py-3">
          <Container className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <ScoreIcon
                key={index}
                size={24}
                className={index < star ? "text-success-text-icons" : "text-tertiary"}
              />
            ))}
          </Container>
        </Container>
        <Text variant="bodySmall" tone="primary">
          {TIER_LABELS[star] ?? "Not yet rated"}
        </Text>
      </Container>

      <Container className="px-2 mt-4">
        <Textarea
          label="Your feedback"
          value={feedback || "No feedback was given."}
          readOnly
          variant2
        />
      </Container>

      <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2">
        <Button className="w-full" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
      </Container>
    </Modal>
  );
};
