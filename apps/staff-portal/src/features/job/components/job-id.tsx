import { Container, Text } from "@resonance/ui";
import React from "react";

interface JobIdProps {
  jobId?: string;
}

export const JobId = ({ jobId = "JOB-1235" }: JobIdProps) => {
  return (
    <Container
      as="span"
      className="bg-muted px-2 py-1 rounded-lg inline-flex items-center w-fit"
    >
      <Text variant="buttonXS" tone="primary">
        {jobId}
      </Text>
    </Container>
  );
};
