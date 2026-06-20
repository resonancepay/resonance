import { Button, Container, Text } from "@resonance/ui";
import { SuccessIcon } from "@resonance/ui/icons";
import React from "react";

export const OnboardingApproved = () => {
  return (
    <Container>
      <Container className="flex flex-col items-center justify-center">
        <SuccessIcon className="text-success-text-icons" size={120} />
        <Text variant="h3" className="text-primary text-center mb-2 mt-12">
          Your application has been approved
        </Text>
      </Container>

      <Container className="mb-9 mt-4">
        <Text className="text-primary text-center" variant="bodyXSmall">
          You can now have jobs assigned to you. Proceed to Job to view your
          pending jobs.
        </Text>
      </Container>
      <Container className="mt-8">
        <Button variant="primary" className="w-full">
          Check out your jobs!
        </Button>
      </Container>
    </Container>
  );
};
