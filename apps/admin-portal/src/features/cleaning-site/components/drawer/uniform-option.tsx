"use client";

import { Container, Text } from "@resonance/ui";
import { CheckIcon } from "@resonance/ui/icons";

interface UniformOptionProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export const UniformOption = ({ label, selected, onToggle }: UniformOptionProps) => {
  return (
    <Container
      as="button"
      type="button"
      onClick={onToggle}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
        selected ? "bg-brand-secondary-bg-light" : "bg-muted"
      }`}
    >
      <Text
        variant="bodySmall"
        className={selected ? "text-brand-secondary-text-icons" : "text-secondary"}
      >
        {label}
      </Text>
      <CheckIcon
        size={14}
        className={selected ? "text-brand-secondary-text-icons" : "text-secondary"}
      />
    </Container>
  );
};
