"use client";

import { Container, Text } from "@resonance/ui";
import { CameraIcon, CloseIcon } from "@resonance/ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { useToast } from "@/shared/toast";
import { JobType } from "../types/job.types";
import { useUploadJobPicture } from "../hooks/jobs.hook";

interface JobPictureWrapperProps {
  status: JobType;
  file: File | null;
  onChange: (file: File | null) => void;
  jobId: number;
  direction: 1 | 2;
}

const getCurrentPosition = (): Promise<GeolocationPosition> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

export const JobPictureWrapper = ({
  status,
  file,
  onChange,
  jobId,
  direction,
}: JobPictureWrapperProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const disabled = status === "pending";
  const { addToast } = useToast();

  const { mutate: uploadPicture, isPending: isUploading } = useUploadJobPicture(
    () => {
      addToast({
        variant: "success",
        title: "Upload complete",
        description: "Your photo has been submitted.",
      });
    },
    () => {
      addToast({
        variant: "error",
        title: "Upload failed",
        description: "Could not submit your photo. Please try again.",
      });
    },
  );

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    onChange(selected);
    e.target.value = "";

    if (!selected) return;

    try {
      const position = await getCurrentPosition();
      uploadPicture({
        job_id: jobId,
        direction,
        current_location_gps_lat: position.coords.latitude,
        current_location_gps_lng: position.coords.longitude,
        file: selected,
      });
    } catch {
      addToast({
        variant: "error",
        title: "Location required",
        description: "Enable location access to submit this photo.",
      });
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  const isVideo = file?.type.startsWith("video/");

  return (
    <Container
      onClick={handleClick}
      className={`${disabled ? "opacity-30 pointer-events-none" : "cursor-pointer"} relative bg-brand-secondary-bg-light gap-2 border border-dashed border-brand-secondary-border h-36.5 rounded-md py-6 flex items-center flex-col justify-center overflow-hidden`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      {previewUrl ? (
        <>
          {isVideo ? (
            <video src={previewUrl} className="absolute inset-0 w-full h-full object-cover" muted playsInline />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} className="absolute inset-0 w-full h-full object-cover" alt="Captured job media" />
          )}
          <Container
            as="button"
            type="button"
            onClick={handleRemove}
            className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
          >
            <CloseIcon size={14} className="text-white" />
          </Container>
          {isUploading && (
            <Container className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="size-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </Container>
          )}
        </>
      ) : (
        <>
          <CameraIcon size={48} />
          <Text variant="button" tone="primary">
            Take a picture/video
          </Text>
          <Text variant="bodyXSmall" tone="secondary">
            Your device camera will be used
          </Text>
        </>
      )}
    </Container>
  );
};
