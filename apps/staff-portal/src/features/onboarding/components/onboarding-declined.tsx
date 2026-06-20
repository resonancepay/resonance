import { Button, Container, Text } from "@resonance/ui";
import React from "react";
import { OnboardingReferenceWrapper } from "./onboarding-reference";
import { BackIcon, DangerIcon } from "@resonance/ui/icons";

export const OnboardingDeclined = () => {
  return (
    <Container>
      <Container className="flex flex-col items-center justify-center">
        <DangerIcon className="text-danger-text-icons" size={120} />
        <Text variant="h3" className="text-primary text-center mb-2 mt-12">
          Your Application Was Not Approved
        </Text>
      </Container>

      <Container className="mb-9 mt-4">
        <Text className="text-primary text-center" variant="bodyXSmall">
          Unfortunately, you do not currently meet the eligibility requirements
          needed to work with Resonance Clean.
        </Text>
      </Container>
      <OnboardingReferenceWrapper />
    </Container>
  );
};
