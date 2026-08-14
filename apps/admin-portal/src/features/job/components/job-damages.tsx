import { Container, Text } from "@resonance/ui";
import { ChevronRightIcon, WarningIcon } from "@resonance/ui/icons";

interface JobDamagesProps {
  count: number;
  onClick?: () => void;
}

// Always-visible entry point to the damages list, independent of job
// control/approval state — mirrors staff-portal's job-damages.tsx.
export const JobDamages = ({ count, onClick }: JobDamagesProps) => {
  return (
    <Container
      as="button"
      type="button"
      onClick={onClick}
      className="bg-surface border-[0.5px] border-border justify-between rounded-xl px-3 py-2.5 flex items-center w-full"
    >
      <Container className="flex items-center gap-2.5">
        <Container className="w-9 h-9 rounded-full bg-warning-bg-light flex items-center justify-center shrink-0">
          <WarningIcon size={18} className="text-warning-text-icons" />
        </Container>
        <Container className="text-left">
          <Text variant="bodySmall" tone="primary">
            Damages
          </Text>
          <Text variant="bodyXSmall" tone="secondary">
            All incurred damages reported
          </Text>
        </Container>
      </Container>
      <Container className="flex items-center gap-1">
        <Container className="rounded-full bg-danger-bg-light px-2 py-0.5">
          <Text variant="buttonXS" tone="danger">
            {count}
          </Text>
        </Container>
        <ChevronRightIcon size={18} className="text-secondary" />
      </Container>
    </Container>
  );
};
