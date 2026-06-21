import { Container, Text } from "@resonance/ui";
import { ChevronRightIcon, SopIcon } from "@resonance/ui/icons";
import React from "react";

export const JobSop = () => {
  return (
    <Container className="bg-surface justify-between rounded-xl px-3 py-2.5 flex items-center">
      <Container className="flex items-center gap-4">
        <Container className="w-9 h-9 rounded-full bg-brand-bg-light flex items-center justify-center">
          <SopIcon size={20} className="text-brand-text-icons" />
        </Container>
        <Container>
          <Text variant="bodySmall" tone="primary">
            Office Buildings/Spaces SOP
          </Text>
          <Text variant="bodyXSmall" tone="secondary">
            View SOP for this site
          </Text>
        </Container>
      </Container>
      <ChevronRightIcon size={20} className="text-secondary" />
    </Container>
  );
};
