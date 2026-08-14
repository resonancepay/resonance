"use client";

import { Button, Container, Modal, Text } from "@resonance/ui";
import { ChevronRightIcon } from "@resonance/ui/icons";
import { JobDamage } from "../../types/job.type";

interface JobDamagesListModalProps {
  isOpen: boolean;
  onClose: () => void;
  damages: JobDamage[];
  onViewDamage: (damage: JobDamage) => void;
}

// Read-only for admin — just shows what the cleaner reported, no
// create/delete actions.
export const JobDamagesListModal = ({
  isOpen,
  onClose,
  damages,
  onViewDamage,
}: JobDamagesListModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width={420}>
      <Container className="px-2 pt-1 pb-3">
        <Text variant="h5" tone="primary">
          Damages Reported
        </Text>
      </Container>

      <Container className="px-2 flex flex-col gap-3 max-h-96 overflow-y-auto">
        {damages.length === 0 && (
          <Text variant="bodySmall" tone="secondary">
            No damages reported for this job.
          </Text>
        )}

        {damages.map((damage, index) => (
          <Container
            key={index}
            as="button"
            type="button"
            onClick={() => onViewDamage(damage)}
            className="bg-warning-bg-light rounded-xl px-3 py-2.5 flex items-center justify-between gap-2 min-w-0 text-left"
          >
            <Text variant="bodySmall" tone="primary" className="flex-1 min-w-0">
              {damage.description}
            </Text>
            <Container className="flex items-center gap-1 shrink-0">
              <Text variant="buttonXS" tone="warning">
                {damage.images.length} image{damage.images.length === 1 ? "" : "s"}
              </Text>
              <ChevronRightIcon size={18} className="text-secondary" />
            </Container>
          </Container>
        ))}
      </Container>

      <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2">
        <Button className="w-full" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
      </Container>
    </Modal>
  );
};
