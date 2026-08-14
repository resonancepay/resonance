import { Button, Container, Text } from "@resonance/ui";
import { CheckIcon, CloseIcon, WarningIcon } from "@resonance/ui/icons";
import React from "react";

interface JobClockActionProps {
  status: "clock-in" | "clock-out";
  onClockIn: () => void;
  onClockOut: () => void;
  isPending?: boolean;
}

export const JobClockAction = ({
  status,
  onClockIn,
  onClockOut,
  isPending,
}: JobClockActionProps) => {
  return (
    <Container className="bg-surface p-2.5 rounded-xl border-[0.5px] border-border">
      {status === "clock-in" && (
        <Container className="flex items-center gap-2.5 flex-col">
          <Button
            rightIcon={<CheckIcon className="text-inverted" size={20} />}
            variant="primary"
            className="w-full"
            onClick={onClockIn}
            disabled={isPending}
            loading={isPending}
          >
            Clock In!
          </Button>
          <Container className="flex items-center justify-center gap-2">
            <WarningIcon className="text-warning-text-icons" />
            <Text variant="bodyXSmall" tone="warning">
              You must be within 200 m of the site to clock in
            </Text>
          </Container>
        </Container>
      )}
      {status === "clock-out" && (
        <Container className="flex items-center gap-2.5 flex-col">
          <Button
            rightIcon={<CloseIcon className="text-inverted" size={20} />}
            variant="danger"
            className="w-full"
            onClick={onClockOut}
            disabled={isPending}
            loading={isPending}
          >
            Clock Out
          </Button>
          <Container className="flex items-center justify-center gap-2">
            <WarningIcon className="text-warning-text-icons" />
            <Text variant="bodyXSmall" tone="warning">
              You must be within 200 m of the site to clock in
            </Text>
          </Container>
        </Container>
      )}
    </Container>
  );
};
