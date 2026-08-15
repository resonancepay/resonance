"use client";

import { Container, ImageViewerModal, Text } from "@resonance/ui";
import { CameraIcon, CloseIcon } from "@resonance/ui/icons";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/toast";
import { useDeleteJobPicture, useUploadJobPicture } from "../hooks/jobs.hook";
import { getCurrentPosition } from "../utils/get-current-position";
import { TakePictureModal } from "./modal/take-picture-modal";

interface JobPictureWrapperProps {
  status: string;
  file: File | null;
  onChange: (file: File | null) => void;
  jobId: number;
  direction: 1 | 2;
  existingImageUrl?: string;
}

export const JobPictureWrapper = ({
  status,
  file,
  onChange,
  jobId,
  direction,
  existingImageUrl,
}: JobPictureWrapperProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const disabled =
    status === "pending" ||
    status === "scheduled" ||
    status === "under-review" ||
    status === "approved";
  const { addToast } = useToast();
  const queryClient = useQueryClient();

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

  const { mutate: deletePicture, isPending: isDeletingExisting } = useDeleteJobPicture(
    () => {
      addToast({
        variant: "success",
        title: "Photo removed",
        description: "The photo has been deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
    },
    () => {
      addToast({
        variant: "error",
        title: "Delete failed",
        description: "Could not remove this photo. Please try again.",
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
    setModalOpen(true);
  };

  const handleModalSave = async ({
    file: selectedFile,
    description,
  }: {
    file: File;
    description: string;
  }) => {
    onChange(selectedFile);
    setModalOpen(false);

    try {
      const position = await getCurrentPosition();
      uploadPicture({
        job_id: jobId,
        description,
        direction,
        current_location_gps_lat: position.coords.latitude,
        current_location_gps_lng: position.coords.longitude,
        file: selectedFile,
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
    if (disabled) return;
    onChange(null);
  };

  const handleRemoveExisting = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled || !existingImageUrl) return;
    deletePicture({ job_id: jobId, image_url: existingImageUrl, direction });
  };

  const showExisting = !previewUrl && !!existingImageUrl;
  // Existing images stay clickable to view full-size even when the job is
  // locked — only the take/replace-picture affordance is actually disabled.
  const interactionDisabled = disabled && !showExisting;

  return (
    <>
      <Container
        onClick={showExisting ? () => setViewerOpen(true) : handleClick}
        className={`${interactionDisabled ? "opacity-30 pointer-events-none" : "cursor-pointer"} relative bg-brand-secondary-bg-light gap-2 border border-dashed border-brand-secondary-border h-36.5 rounded-md py-6 flex items-center flex-col justify-center overflow-hidden`}
      >
        {previewUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} className="absolute inset-0 w-full h-full object-cover" alt="Captured job media" />
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
        ) : showExisting ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={existingImageUrl}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Submitted job photo"
            />
            {!disabled && (
              <Container
                as="button"
                type="button"
                onClick={handleRemoveExisting}
                disabled={isDeletingExisting}
                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 hover:bg-black/80 transition-colors disabled:opacity-50"
              >
                <CloseIcon size={14} className="text-white" />
              </Container>
            )}
            {isDeletingExisting && (
              <Container className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="size-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </Container>
            )}
          </>
        ) : (
          <>
            <CameraIcon size={48} />
            <Text variant="button" tone="primary">
              Take a picture
            </Text>
            <Text variant="bodyXSmall" tone="secondary">
              Your device camera will be used
            </Text>
          </>
        )}
      </Container>

      <TakePictureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleModalSave}
      />

      {existingImageUrl && (
        <ImageViewerModal
          isOpen={viewerOpen}
          onClose={() => setViewerOpen(false)}
          src={existingImageUrl}
          alt="Submitted job photo"
        />
      )}
    </>
  );
};
