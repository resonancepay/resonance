"use client";

import { Container, Text } from "@resonance/ui";
import { FolderIcon, CloseIcon, TickIcon } from "@resonance/ui/icons";
import React, { useRef } from "react";

interface OnboardingUploadBoxProps {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

const MAX_SIZE_BYTES = 40 * 1024 * 1024; // 40 MB

export const OnboardingUploadBox = ({ file, onChange, error }: OnboardingUploadBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (!selected) return;

    if (selected.size > MAX_SIZE_BYTES) {
      onChange(null);
      return;
    }

    onChange(selected);
    e.target.value = "";
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <Container>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleFileChange}
      />

      <Container
        onClick={handleClick}
        className={`w-full bg-brand-secondary-bg-light h-45 rounded-xl flex-col flex items-center justify-center border border-dashed cursor-pointer transition-colors hover:bg-brand-secondary-bg-light/80 ${
          error ? "border-danger-border" : "border-brand-secondary-border"
        }`}
      >
        {file ? (
          <Container className="flex items-center gap-3 px-4">
            <Container className="p-2 rounded-lg bg-success-bg-light">
              <TickIcon size={16} className="text-success-text-icons" />
            </Container>
            <Container className="flex-1 min-w-0">
              <Text variant="button" className="text-primary truncate block">
                {file.name}
              </Text>
              <Text variant="bodyXSmall" className="text-secondary">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </Text>
            </Container>
            <Container
              as="button"
              type="button"
              onClick={handleRemove}
              className="p-1 rounded-lg hover:bg-muted transition-colors shrink-0"
            >
              <CloseIcon size={16} className="text-secondary" />
            </Container>
          </Container>
        ) : (
          <>
            <FolderIcon />
            <Container className="flex items-center justify-center flex-col mt-2">
              <Text variant="button" className="text-primary">
                Click to Upload
              </Text>
              <Container className="mt-2">
                <Text className="text-secondary text-center" variant="bodyXSmall">
                  Supported format: .pdf, .docx
                </Text>
                <Text className="text-secondary text-center" variant="bodyXSmall">
                  Max size of 40 MB
                </Text>
              </Container>
            </Container>
          </>
        )}
      </Container>

      {error && (
        <Text variant="bodyXSmall" className="text-danger-text-icons mt-1">
          {error}
        </Text>
      )}
    </Container>
  );
};
