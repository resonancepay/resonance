import { Container, Text } from "@resonance/ui";
import React from "react";

export const JobId = ({ jobId }: { jobId?: string }) => {
  return (
    <Container
      as="span"
      className="bg-muted px-2 py-1 rounded-lg inline-flex items-center w-fit"
    >
      <Text variant="buttonXS" tone="primary">
        {jobId || "N/A"}
      </Text>
    </Container>
  );
};
