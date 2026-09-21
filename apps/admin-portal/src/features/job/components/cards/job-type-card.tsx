import { Container, Text } from "@resonance/ui";
import React from "react";

export const JobTypeCard = ({
  active,
  mainText,
  subText,
  setActive,
}: {
  active: boolean;
  mainText: string;
  subText: string;
  setActive: (val: boolean) => void;
}) => {
  return (
    <Container
      as="button"
      type="button"
      role="radio"
      aria-checked={active}
      onClick={() => setActive(true)}
      className={`w-full text-left px-2 rounded-xl py-4.5 flex items-center gap-3 ${active ? "bg-brand-tertiary-bg-light border-brand-tertiary-border" : "bg-muted"}`}
    >
      <Container
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${active ? "border-brand-tertiary-bg-bold" : "border-border"}`}
      >
        {active && (
          <Container className="w-2.5 h-2.5 rounded-full bg-brand-tertiary-bg-bold" />
        )}
      </Container>
      <Container className="flex flex-col">
        <Text variant="button" tone="primary">
          {mainText}
        </Text>
        <Text variant="bodyXSmall" tone="primary">
          {subText}
        </Text>
      </Container>
    </Container>
  );
};
