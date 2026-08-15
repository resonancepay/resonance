import { Container, Text } from "@resonance/ui";
import { AddIcon } from "@resonance/ui/icons";
import React from "react";

interface JobImageAddMoreProps {
  status: string;
  onClick?: () => void;
}

export const JobImageAddMore = ({ status, onClick }: JobImageAddMoreProps) => {
  const disabled =
    status === "pending" ||
    status === "scheduled" ||
    status === "under-review" ||
    status === "approved";

  return (
    <Container
      onClick={disabled ? undefined : onClick}
      className={`${disabled ? "opacity-30 pointer-events-none" : "cursor-pointer"} h-36.5 bg-muted rounded-md gap-4 flex items-center justify-center flex-col`}
    >
      <AddIcon className="text-primary" size={24} />
      <Text variant="button" tone="primary">
        Add more
      </Text>
    </Container>
  );
};
