"use client";

import { Button, Container, Modal, Select, Text, Textarea } from "@resonance/ui";
import { CloseIcon, DangerIcon } from "@resonance/ui/icons";
import { useState } from "react";

interface RejectCleanerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReject: (data: { reason: string; description: string }) => void;
}

const rejectReasons = [
  { label: "Failed background check", value: "failed_background_check" },
  { label: "Ineligible to work", value: "ineligible_to_work" },
  { label: "Incomplete documentation", value: "incomplete_documentation" },
  { label: "Other", value: "other" },
];

export const RejectCleanerModal = ({ isOpen, onClose, onReject }: RejectCleanerModalProps) => {
  const [reason, setReason] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState("");

  const handleReject = () => {
    onReject({ reason: reason ?? "", description });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={379}>
      <Container className="bg-danger-bg-light rounded-xl h-28 flex items-center justify-center">
        <DangerIcon size={58} className="text-danger-text-icons" />
      </Container>

      <Container className="px-4 pt-4">
        <Text variant="h5" tone="primary">
          Are you sure you want to reject this cleaner&apos;s application?
        </Text>

        <Container className="mt-6">
          <Select
            label="Reason"
            required
            variant2
            placeholder="Select reason"
            options={rejectReasons}
            value={reason}
            onChange={setReason}
          />
        </Container>

        <Container className="mt-4">
          <Textarea
            label="Description"
            required
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant2
          />
        </Container>
      </Container>

      <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2 flex gap-2.5">
        <Button className="w-full" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="w-full"
          variant="danger"
          rightIcon={<CloseIcon size={16} className="text-inverted" />}
          onClick={handleReject}
        >
          Reject
        </Button>
      </Container>
    </Modal>
  );
};
