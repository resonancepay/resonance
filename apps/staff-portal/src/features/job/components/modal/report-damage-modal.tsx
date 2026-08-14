"use client";

import { Button, Container, Modal, Text, Textarea } from "@resonance/ui";
import { CameraIcon, CheckIcon, CloseIcon } from "@resonance/ui/icons";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const IMAGE_SLOTS = 3;

interface DamageImageSlotProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

const DamageImageSlot = ({ file, onChange }: DamageImageSlotProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files?.[0] ?? null);
    e.target.value = "";
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <Container
      onClick={() => inputRef.current?.click()}
      className="relative bg-brand-secondary-bg-light gap-2 border border-dashed border-brand-secondary-border h-32 rounded-md py-4 px-2 flex items-center flex-col justify-center overflow-hidden cursor-pointer"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      {previewUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Damage photo"
          />
          <Container
            as="button"
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 p-1 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
          >
            <CloseIcon size={12} className="text-white" />
          </Container>
        </>
      ) : (
        <>
          <CameraIcon size={32} />
          <Text variant="bodyXSmall" tone="primary" className="text-center">
            Take a picture
          </Text>
        </>
      )}
    </Container>
  );
};

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
