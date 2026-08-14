"use client";

import { Button, Container, Modal, Text, Textarea } from "@resonance/ui";
import { DeleteIcon } from "@resonance/ui/icons";
import { Damage } from "../../types/job.types";

interface DamageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  damage: Damage | null;
  onDelete: (damageId: number) => void;
  isDeleting?: boolean;
  // Once a job is approved, this becomes fully view-only — no delete.
  readOnly?: boolean;
}

// The cleaner can see what they reported and delete it, but not edit the
// description or images once submitted — and once the job is approved, not
// even delete it.
export const DamageDetailModal = ({
  isOpen,
  onClose,
  damage,
  onDelete,
  isDeleting,
  readOnly,
}: DamageDetailModalProps) => {
  if (!damage) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={420}>
      <Container className="px-2">
        <Textarea
          label="What's damaged"
          value={damage.description}
          readOnly
          variant2
        />
      </Container>

      <Container className="px-2 mt-4">
        <Text variant="bodySmall" className="text-primary mb-1">
          Images
        </Text>
        <Container className="grid grid-cols-3 gap-2">
          {damage.images.map((url, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={index}
              src={url}
              alt={`Damage photo ${index + 1}`}
              className="h-32 w-full rounded-md object-cover"
            />
          ))}
        </Container>
      </Container>

      <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2 flex gap-2.5">
        <Button className="w-full" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
        {!readOnly && (
          <Button
            className="w-full"
            variant="danger"
            leftIcon={<DeleteIcon size={16} />}
            onClick={() => onDelete(damage.damage_id)}
            disabled={isDeleting}
            loading={isDeleting}
          >
            Delete
          </Button>
        )}
      </Container>
    </Modal>
  );
};
