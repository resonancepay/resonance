import { Container, Text } from "@resonance/ui";
import React, { ReactNode } from "react";

export const EmptyState = ({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) => {
  return (
    <Container className="flex items-center justify-center gap-2 py-3.5">
      {icon}
      <Text variant="bodySmall" tone="secondary">
        {text}
      </Text>
    </Container>
  );
};
