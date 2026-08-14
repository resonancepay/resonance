"use client";

import { Checkbox, Container, Text } from "@resonance/ui";

interface JobChecklistItemProps {
  label: string;
  checked: boolean;
}

// Read-only — this reflects what the cleaner already checked off on their
// side, the admin has no ability to toggle it.
export const JobChecklistItem = ({ label, checked }: JobChecklistItemProps) => {
  return (
    <Container
      className={`${checked ? "bg-brand-tertiary-bg-light" : "bg-background"} rounded-xl px-3 py-2.5 w-full flex items-center gap-3`}
    >
      <Checkbox checked={checked} disabled />
      <Text variant="bodySmall" tone="primary">
        {label}
      </Text>
    </Container>
  );
};
