"use client";

import { Button, Container, Modal, Text, Textarea } from "@resonance/ui";
import { CameraIcon, CheckIcon } from "@resonance/ui/icons";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface TakePictureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { file: File; description: string }) => void;
}

export const TakePictureModal = ({ isOpen, onClose, onSave }: TakePictureModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setFile(null);
      setDescription("");
    }
  }, [isOpen]);

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
    setFile(e.target.files?.[0] ?? null);
    e.target.value = "";
  };

  const canSave = !!file && description.trim().length > 0;

  const handleSave = () => {
    if (!file) return;
    onSave({ file, description });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={420}>
      <Container className="px-2 pt-1 pb-3">
        <Text variant="h5" tone="primary">
          Add Media
        </Text>
      </Container>

      <Container className="mx-2">
        <Container
          onClick={() => inputRef.current?.click()}
          className="relative bg-brand-secondary-bg-light gap-2 border border-dashed border-brand-secondary-border h-44 rounded-md py-6 flex items-center flex-col justify-center overflow-hidden cursor-pointer"
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
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Selected image"
            />
          ) : (
            <>
              <CameraIcon size={48} />
              <Text variant="button" tone="primary">
                Take a picture
              </Text>
            </>
          )}
        </Container>
      </Container>

      <Container className="px-2 mt-4">
        <Textarea
          label="Picture description"
          required
          placeholder="Enter a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant2
        />
      </Container>

      <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2 flex gap-2.5">
        <Button className="w-full" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="w-full"
          variant="primary"
          rightIcon={<CheckIcon size={16} className="text-inverted" />}
          onClick={handleSave}
          disabled={!canSave}
        >
          Save
        </Button>
      </Container>
    </Modal>
  );
};
