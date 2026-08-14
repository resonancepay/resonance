import { Container, Text } from "@resonance/ui";
import { DurationIcon } from "@resonance/ui/icons";
import React from "react";

export const JobTimer = ({ timeRange }: { timeRange?: string }) => {
  return (
    <Container className="flex items-center gap-2 shrink-0">
      <DurationIcon size={16} className="text-secondary" />
      <Text variant="bodyXSmall" tone="secondary">
        {timeRange || "N/A"}
      </Text>
    </Container>
  );
};
