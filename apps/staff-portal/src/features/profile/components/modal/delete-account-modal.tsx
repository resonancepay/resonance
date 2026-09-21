"use client";

import { Button, Container, Modal, Text } from "@resonance/ui";
import { DeleteIcon, WarningIcon } from "@resonance/ui/icons";

const CONSEQUENCES = [
  "Your account will be permanently deleted.",
  "You will lose access to your profile and job history.",
  "You will no longer receive cleaning job assignments.",
  "This action cannot be undone.",
];

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
          You are about to delete your account, hence terminating your
          access.
        </Text>
      </Container>

      <Container className="px-2 mt-4">
        <Text variant="bodySmall" tone="primary" className="mb-2">
          What will happen?
        </Text>
        <Container className="flex flex-col gap-1.5">
          {CONSEQUENCES.map((line) => (
            <Container key={line} className="flex items-start gap-2">
              <Text variant="bodySmall" tone="secondary">
                •
              </Text>
              <Text variant="bodySmall" tone="secondary">
                {line}
              </Text>
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
