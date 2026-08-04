import { Container, Text } from "@resonance/ui";
import React from "react";

export const JobId = () => {
  return (
    <Container
      as="span"
      className="bg-muted px-2 py-1 rounded-lg inline-flex items-center w-fit"
    >
      <Text variant="buttonXS" tone="primary">
        JOB-1235
      </Text>
    </Container>
  );
};
