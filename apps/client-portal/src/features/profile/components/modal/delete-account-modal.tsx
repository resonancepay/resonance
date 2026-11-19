"use client";

import { Button, Container, Modal, Text } from "@resonance/ui";
import { DeleteIcon, WarningIcon } from "@resonance/ui/icons";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending?: boolean;
}

export const DeleteAccountModal = ({
  isOpen,
  onClose,
  onConfirm,
  isPending,
}: DeleteAccountModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width={420}>
      <Container className="bg-danger-bg-light rounded-xl flex items-center justify-center py-8">
        <WarningIcon size={64} className="text-danger-bg-bold" />
      </Container>

      <Container className="px-2 pt-4">
        <Text variant="h5" tone="primary">
          Delete Account?
        </Text>
      </Container>

      <Container className="px-2 mt-2">
        <Text variant="bodySmall" tone="secondary">
          Deleting your account is permanent and cannot be undone. Once your
          account is deleted, you&apos;ll lose access to your job history,
          reviews, and any associated information.
        </Text>
      </Container>

      <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2 flex gap-2.5">
        <Button className="w-full" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="w-full"
          variant="danger"
          rightIcon={<DeleteIcon size={16} className="text-inverted" />}
          loading={isPending}
          onClick={onConfirm}
        >
          Yes, Delete
        </Button>
      </Container>
    </Modal>
  );
};
