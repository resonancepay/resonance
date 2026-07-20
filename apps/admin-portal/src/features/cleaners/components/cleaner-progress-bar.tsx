import { Container, Text } from "@resonance/ui";
import React from "react";

type ProgressBarVariant = "success" | "warning" | "danger";

const VARIANT_FILL_CLASS: Record<ProgressBarVariant, string> = {
  success: "bg-success-text-icons",
  warning: "bg-warning-text-icons",
  danger: "bg-danger-text-icons",
};

interface CleanerPerformanceProgressBarProps {
  label: string;
  value: string;
  percentage: number;
  variant?: ProgressBarVariant;
}

export const CleanerPerformanceProgressBar = ({
  label,
  value,
  percentage,
  variant = "success",
}: CleanerPerformanceProgressBarProps) => {
  return (
    <Container className="border-[0.5px] border-border rounded-xl p-3.5 mb-4">
      <Container className="flex items-center justify-between mb-2">
        <Text tone="secondary" variant="bodySmall">
          {label}
        </Text>
        <Text variant="h5" tone="primary">
          {value}
        </Text>
      </Container>
      <Container className="w-full h-1.5 rounded-sm bg-muted overflow-hidden">
        <Container
          className={`h-full ${VARIANT_FILL_CLASS[variant]}`}
          style={{ width: `${percentage}%` }}
        ></Container>
      </Container>
    </Container>
  );
};
