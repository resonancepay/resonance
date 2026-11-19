import { Button, Container, Text } from "@resonance/ui";
import { CheckIcon, InfoIcon } from "@resonance/ui/icons";

interface JobClaimActionProps {
  onClaim: () => void;
  isPending?: boolean;
}

export const JobClaimAction = ({ onClaim, isPending }: JobClaimActionProps) => {
  return (
    <Container className="bg-surface p-2.5 rounded-xl border-[0.5px] border-border">
      <Container className="flex items-center gap-2.5 flex-col">
        <Button
          rightIcon={<CheckIcon className="text-inverted" size={20} />}
          variant="primary"
          className="w-full"
          onClick={onClaim}
          disabled={isPending}
          loading={isPending}
        >
          Claim Job!
        </Button>
        <Container className="flex items-center justify-center gap-2">
          <InfoIcon className="text-info-text-icons" size={16} />
          <Text variant="bodyXSmall" tone="info">
            The job will be assigned to a cleaner who claims it
          </Text>
        </Container>
      </Container>
    </Container>
  );
};
