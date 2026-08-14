"use client";

import { Button, Container, Modal, Text } from "@resonance/ui";
import { CheckIcon, SuccessIcon } from "@resonance/ui/icons";

interface ApproveCleanerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  isPending?: boolean;
}

export const ApproveCleanerModal = ({ isOpen, onClose, onApprove, isPending }: ApproveCleanerModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width={379}>
      <Container className="bg-success-bg-light rounded-xl h-28 flex items-center justify-center">
        <SuccessIcon size={58} className="text-success-text-icons" />
      </Container>

      <Container className="px-4 pt-4">
        <Text variant="h5" tone="primary">
          Are you sure you want to approve this cleaner&apos;s application?
        </Text>
      </Container>

      <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2 flex gap-2.5">
        <Button className="w-full" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="w-full"
          variant="green"
          rightIcon={<CheckIcon size={16} className="text-inverted" />}
          onClick={onApprove}
          loading={isPending}
        >
          Approve
        </Button>
      </Container>
    </Modal>
  );
};
