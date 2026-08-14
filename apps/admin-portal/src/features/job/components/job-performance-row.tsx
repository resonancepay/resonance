import { Container, Text } from "@resonance/ui";

export type PerformanceTone = "success" | "warning" | "danger" | "neutral";

const FILL_CLASS: Record<PerformanceTone, string> = {
  success: "bg-success-text-icons",
  warning: "bg-warning-text-icons",
  danger: "bg-danger-text-icons",
  neutral: "bg-border",
};

interface JobPerformanceRowProps {
  label: string;
  value: string;
  percentage: number;
  tone: PerformanceTone;
}

export const JobPerformanceRow = ({
  label,
  value,
  percentage,
  tone,
}: JobPerformanceRowProps) => {
  return (
    <Container className="border-[0.5px] border-border rounded-xl p-3.5 mb-4 last:mb-0">
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
          className={`h-full ${FILL_CLASS[tone]}`}
          style={{ width: `${percentage}%` }}
        />
      </Container>
    </Container>
  );
};
