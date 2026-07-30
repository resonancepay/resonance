"use client";

import { Button, Container, Modal, Text } from "@resonance/ui";
import { CloseIcon, DangerIcon } from "@resonance/ui/icons";

interface CancelJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancelJob: () => void;
}

export const CancelJobModal = ({ isOpen, onClose, onCancelJob }: CancelJobModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width={379}>
      <Container className="bg-danger-bg-light rounded-xl h-28 flex items-center justify-center">
        <DangerIcon size={58} className="text-danger-text-icons" />
      </Container>

      <Container className="px-4 pt-4">
        <Text variant="h5" tone="primary">
          Are you sure you want to cancel this Job, this is a permanent action?
        </Text>
      </Container>

      <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2 flex gap-2.5">
        <Button className="w-full" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="w-full"
          variant="danger"
          rightIcon={<CloseIcon size={16} className="text-inverted" />}
          onClick={onCancelJob}
        >
          Cancel
        </Button>
      </Container>
    </Modal>
  );
};
