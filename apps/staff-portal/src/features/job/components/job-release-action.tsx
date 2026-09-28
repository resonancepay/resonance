import { Button, Container, Text } from "@resonance/ui";
import { CloseIcon, InfoIcon } from "@resonance/ui/icons";

interface JobReleaseActionProps {
  onRelease: () => void;
  isPending?: boolean;
}

export const JobReleaseAction = ({
  onRelease,
  isPending,
}: JobReleaseActionProps) => {
  return (
    <Container className="bg-surface p-2.5 rounded-xl border-[0.5px] border-border">
      <Container className="flex items-center gap-2.5 flex-col">
        <Button
          rightIcon={<CloseIcon className="text-inverted" size={20} />}
          variant="danger"
          className="w-full"
          onClick={onRelease}
          disabled={isPending}
          loading={isPending}
        >
          Release This Job
        </Button>
        <Container className="flex items-center justify-center gap-2">
          <InfoIcon className="text-info-text-icons" size={16} />
          <Text variant="bodyXSmall" tone="info">
            This job will no longer be on your schedule
          </Text>
        </Container>
      </Container>
    </Container>
  );
};
