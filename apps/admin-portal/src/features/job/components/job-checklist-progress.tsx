import { Container, Text } from "@resonance/ui";
import { JobIcon2 } from "@resonance/ui/icons";

interface JobChecklistProgressProps {
  percentage: number;
}

const SIZE = 165;
const STROKE_WIDTH = 14;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export const JobChecklistProgress = ({ percentage }: JobChecklistProgressProps) => {
  const offset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

  return (
    <Container className="flex items-center justify-center flex-col gap-2 h-full">
      <Container className="relative h-41.25 w-41.25">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90 h-full w-full">
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE_WIDTH}
            className="stroke-brand-bg-light"
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="stroke-brand-bg-bold transition-[stroke-dashoffset] duration-300"
          />
        </svg>
        <Container className="absolute inset-0 flex items-center justify-center">
          <Text variant="h4" tone="primary">
            {percentage}%
          </Text>
        </Container>
      </Container>
      <Container className="flex items-center gap-2">
        <JobIcon2 className="text-primary" size={20} />
        <Text variant="bodyXSmall" tone="primary">
          Job Done
        </Text>
      </Container>
    </Container>
  );
};
