"use client";
import { Checkbox, Container, Text } from "@resonance/ui";
import React, { useState } from "react";

export const JobRequirement = ({ label }: { label: string }) => {
  const [checked, setChecked] = useState(false);
  return (
    <Container
      className={`${checked ? "bg-brand-tertiary-bg-light" : "bg-background"}  rounded-xl px-3 py-2.5 w-full flex items-center gap-3`}
    >
      <Checkbox
        checked={checked}
        onChange={(checked) => {
          setChecked(checked);
        }}
      />
      <Text variant="bodySmall" tone="primary">
        {label}
      </Text>
    </Container>
  );
};
