import { Container, Text } from "@resonance/ui";
import { DurationIcon } from "@resonance/ui/icons";
import React from "react";

interface JobTimerProps {
  timeRange?: string;
}

export const JobTimer = ({ timeRange = "08:00 - 10:30" }: JobTimerProps) => {
  return (
    <Container className="flex items-center gap-2 shrink-0">
      <DurationIcon size={16} className="text-secondary" />
      <Text variant="bodyXSmall" tone="secondary">
        {timeRange}
      </Text>
    </Container>
  );
};
