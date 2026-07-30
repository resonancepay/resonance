"use client";

import { Checkbox, Container, Text } from "@resonance/ui";

interface JobChecklistItemProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const JobChecklistItem = ({ label, checked, onChange }: JobChecklistItemProps) => {
  return (
    <Container
      className={`${checked ? "bg-brand-tertiary-bg-light" : "bg-background"} rounded-xl px-3 py-2.5 w-full flex items-center gap-3`}
    >
      <Checkbox checked={checked} onChange={onChange} />
      <Text variant="bodySmall" tone="primary">
        {label}
      </Text>
    </Container>
  );
};
