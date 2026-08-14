"use client";
import { Checkbox, Container, Text } from "@resonance/ui";
import React from "react";

interface JobRequirementProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const JobRequirement = ({
  label,
  checked,
  onChange,
  disabled,
}: JobRequirementProps) => {
  return (
    <Container
      className={`${checked ? "bg-brand-tertiary-bg-light" : "bg-background"} ${disabled ? "opacity-50" : ""} rounded-xl px-3 py-2.5 w-full flex items-center gap-3`}
    >
      <Checkbox checked={checked} onChange={onChange} disabled={disabled} />
      <Text variant="bodySmall" tone="primary">
        {label}
      </Text>
    </Container>
  );
};
