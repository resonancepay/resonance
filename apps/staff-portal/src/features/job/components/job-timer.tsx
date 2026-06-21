import { Container, Text } from "@resonance/ui";
import { DurationIcon } from "@resonance/ui/icons";
import React from "react";

export const JobTimer = () => {
  return (
    <Container className="flex items-center gap-2 shrink-0">
      <DurationIcon size={16} className="text-secondary" />
      <Text variant="bodyXSmall" tone="secondary">
        08:00 - 10:30
      </Text>
    </Container>
  );
};
