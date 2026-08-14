import { Container, Text } from "@resonance/ui";
import { ChevronRightIcon, ScoreIcon } from "@resonance/ui/icons";

interface JobPerformanceScoreProps {
  percentage: number;
  onClick: () => void;
}

// Same decorative treatment as staff-portal's JobQualityScore (scattered
// ScoreIcon stars) — reused here rather than reinvented.
export const JobPerformanceScore = ({
  percentage,
  onClick,
}: JobPerformanceScoreProps) => {
  return (
    <Container
      as="button"
      type="button"
      onClick={onClick}
      className="rounded-xl px-3.5 py-3 bg-brand-bg-light relative overflow-hidden w-full text-left"
    >
      <Text variant="bodyXSmall" tone="secondary">
        Cleaner&apos;s Performance Score
      </Text>
      <Container className="flex items-center gap-1">
        <Text tone="primary" variant="h3">
          {percentage}%
        </Text>
        <ChevronRightIcon size={18} className="text-secondary" />
      </Container>
      <Container>
        <ScoreIcon
          className="text-brand-text-icons opacity-50 absolute -top-5 right-10"
          size={40}
          style={{ transform: "rotate(26deg)" }}
        />
        <ScoreIcon
          className="text-brand-text-icons absolute top-0 -right-2"
          size={40}
          style={{ transform: "rotate(26deg)" }}
        />
        <ScoreIcon
          className="text-brand-text-icons opacity-50 -bottom-3 right-0 absolute"
          size={40}
          style={{ transform: "rotate(26deg)" }}
        />
      </Container>
    </Container>
  );
};
