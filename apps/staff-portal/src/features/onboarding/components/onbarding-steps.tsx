import { Container } from "@resonance/ui";
import React from "react";

const TOTAL_STEPS = 4;

export const OnboardingSteps = ({ activeState }: { activeState: number }) => {
  return (
    <Container className="w-full flex items-center gap-2 mb-7">
      {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
        <Container
          key={index}
          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
            index < activeState ? "bg-brand-tertiary-bg-bold" : "bg-tertiary"
          }`}
        />
      ))}
    </Container>
  );
};
