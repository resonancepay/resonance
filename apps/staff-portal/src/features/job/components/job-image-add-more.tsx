import { Container, Text } from "@resonance/ui";
import { AddIcon } from "@resonance/ui/icons";
import React from "react";
import { JobType } from "../types/job.types";

interface JobImageAddMoreProps {
  status: JobType;
  onClick?: () => void;
}

export const JobImageAddMore = ({ status, onClick }: JobImageAddMoreProps) => {
  const disabled = status === "pending";

  return (
    <Container
      onClick={disabled ? undefined : onClick}
      className={`${disabled ? "opacity-30 pointer-events-none" : "cursor-pointer"} h-36.5 bg-muted rounded-md gap-4 flex items-center justify-center flex-col`}
    >
      <AddIcon className="text-primary" size={24} />
      <Text variant="button" tone="primary">
        Add more
      </Text>
    </Container>
  );
};
