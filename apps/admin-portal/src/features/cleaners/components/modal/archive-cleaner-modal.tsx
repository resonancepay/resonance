"use client";

import { Button, Container, Modal, Text } from "@resonance/ui";
import { MinusIcon, WarningIcon } from "@resonance/ui/icons";

interface ArchiveCleanerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onArchive: () => void;
}

export const ArchiveCleanerModal = ({ isOpen, onClose, onArchive }: ArchiveCleanerModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width={379}>
      <Container className="bg-warning-bg-light rounded-xl h-28 flex items-center justify-center">
        <WarningIcon size={58} className="text-warning-text-icons" />
      </Container>

      <Container className="px-4 pt-4">
        <Text variant="h5" tone="primary">
          Are you sure you want to archive this cleaner&apos;s application?
        </Text>
      </Container>

      <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2 flex gap-2.5">
        <Button className="w-full" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="w-full"
          variant="warning"
          rightIcon={<MinusIcon size={16} className="text-inverted" />}
          onClick={onArchive}
        >
          Archive
        </Button>
      </Container>
    </Modal>
  );
};
