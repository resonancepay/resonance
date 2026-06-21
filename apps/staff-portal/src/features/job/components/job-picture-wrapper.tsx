import { Container, Text } from "@resonance/ui";
import { CameraIcon } from "@resonance/ui/icons";
import Image from "next/image";
import React from "react";
import { JobType } from "../types/job.types";

export const JobPictureWrapper = ({ status }: { status: JobType }) => {
  return (
    <Container
      className={`${status === "pending" && "opacity-30"} bg-brand-secondary-bg-light gap-2 border border-dashed border-brand-secondary-border h-36.5 rounded-md py-6 flex items-center flex-col justify-center`}
    >
      <CameraIcon size={48} />
      <Text variant="button" tone="primary">
        Take a picture/video
      </Text>
      <Text variant="bodyXSmall" tone="secondary">
        Your device camera will be used
      </Text>
    </Container>
  );
};
