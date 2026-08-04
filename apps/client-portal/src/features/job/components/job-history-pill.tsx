import { Container, Text } from "@resonance/ui";
import { CheckIcon } from "@resonance/ui/icons";
import React from "react";

export const JobHistoryPill = ({ label }: { label: string }) => {
  return (
    <Container
      as="span"
      className="border border-border bg-muted px-2.5 py-1 gap-2 flex items-center rounded-4xl"
    >
      <Text variant="bodyXSmall" tone="secondary">
        {label}
      </Text>
      <CheckIcon size={12} className="text-secondary" />
    </Container>
  );
};
