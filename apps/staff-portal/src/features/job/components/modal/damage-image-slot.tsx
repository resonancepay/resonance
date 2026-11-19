"use client";

import { Container, Text } from "@resonance/ui";
import { CameraIcon, CloseIcon } from "@resonance/ui/icons";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface DamageImageSlotProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

export const DamageImageSlot = ({ file, onChange }: DamageImageSlotProps) => {
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
