import { Container, Text } from "@resonance/ui";
import { AddIcon } from "@resonance/ui/icons";
import React from "react";
import { JobType } from "../types/job.types";

export const JobImageAddMore = ({ status }: { status: JobType }) => {
  return (
    <Container
      className={`${status === "pending" && "opacity-30"} h-36.5 bg-muted rounded-md cursor-pointer gap-4 flex items-center justify-center flex-col`}
    >
      <AddIcon className="text-primary" size={24} />
      <Text variant="button" tone="primary">
        Add more
      </Text>
    </Container>
  );
};
