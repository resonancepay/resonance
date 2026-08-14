"use client";

import { Button, Container, Modal, Text } from "@resonance/ui";
import { JobDamage } from "../../types/job.type";

interface JobDamageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  damage: JobDamage | null;
}

// Read-only — admin is just viewing what the cleaner reported, no edit or
// delete action.
export const JobDamageDetailModal = ({
  isOpen,
  onClose,
  damage,
}: JobDamageDetailModalProps) => {
  if (!damage) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={420}>
      <Container className="px-2 pt-1 pb-3">
        <Text variant="h5" tone="primary">
          Damaged Report
        </Text>
      </Container>

      <Container className="px-2 pb-4 border-b-[0.5px] border-border">
        <Text variant="bodySmall" tone="secondary" className="mb-1">
          Whats damaged
        </Text>
        <Text variant="bodySmall" tone="primary">
          {damage.description}
        </Text>
      </Container>

      <Container className="px-2 pt-4">
        <Text variant="bodySmall" tone="secondary" className="mb-2">
          Images
        </Text>
        <Container className="grid grid-cols-3 gap-2">
          {damage.images.map((url, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={index}
              src={url}
              alt={`Damage photo ${index + 1}`}
              className="h-24 w-full rounded-md object-cover"
            />
          ))}
        </Container>
      </Container>

      <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2">
        <Button className="w-full" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
      </Container>
    </Modal>
  );
};
