"use client";

import { Button, Container, Modal, Text, Textarea } from "@resonance/ui";
import { CheckIcon } from "@resonance/ui/icons";
import { useEffect, useState } from "react";
import { DamageImageSlot } from "./damage-image-slot";

const IMAGE_SLOTS = 3;

interface ReportDamageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { description: string; files: File[] }) => void;
  isPending?: boolean;
}

export const ReportDamageModal = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
}: ReportDamageModalProps) => {
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<(File | null)[]>(Array(IMAGE_SLOTS).fill(null));

  useEffect(() => {
    if (!isOpen) {
      setDescription("");
      setFiles(Array(IMAGE_SLOTS).fill(null));
    }
  }, [isOpen]);

  const selectedFiles = files.filter((file): file is File => file !== null);
  const canSubmit = description.trim().length > 0 && selectedFiles.length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({ description: description.trim(), files: selectedFiles });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={420}>
      <Container className="px-2 pt-1 pb-3">
        <Text variant="h5" tone="primary">
          Report Damages
        </Text>
      </Container>

      <Container className="px-2">
        <Textarea
          label="What's damaged"
          required
          placeholder="e.g Cracked tile near kitchen entrance"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant2
        />
      </Container>

      <Container className="px-2 mt-4">
        <Container as="label" className="flex items-center gap-0.5 mb-1">
          <Text variant="bodySmall" className="text-primary">
            Images
          </Text>
          <Text variant="bodySmall" className="text-danger-text-icons">
            *
          </Text>
        </Container>
        <Container className="grid grid-cols-3 gap-2">
          {files.map((file, index) => (
            <DamageImageSlot
              key={index}
              file={file}
              onChange={(f) =>
                setFiles((prev) => prev.map((item, i) => (i === index ? f : item)))
              }
            />
          ))}
        </Container>
      </Container>

      <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2 flex gap-2.5">
        <Button className="w-full" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="w-full"
          variant="primary"
          rightIcon={<CheckIcon size={16} className="text-inverted" />}
          onClick={handleSubmit}
          disabled={!canSubmit || isPending}
          loading={isPending}
        >
          Submit Report
        </Button>
      </Container>
    </Modal>
  );
};
