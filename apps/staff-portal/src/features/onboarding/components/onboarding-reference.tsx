import { LoginInfo } from "@/features/auth/components/login-info";
import { Container, Text } from "@resonance/ui";
import { CopyIcon } from "@resonance/ui/icons";
import React from "react";
import { OnboardingInfo } from "./onboarding-info";

export const OnboardingReferenceWrapper = ({ referenceCode }: { referenceCode: string }) => {
  return (
    <Container className="bg-surface p-1 rounded-2xl w-full">
      <Container className="bg-muted flex items-center flex-col gap-1 py-4 p-2 rounded-xl">
        <Text className="text-secondary">
          Here&apos;s your reference number
        </Text>
        <Container className="flex items-center gap-2">
          <Text className="text-brand-secondary-text-icons" variant="bodyLarge">
            {referenceCode}
          </Text>
          <CopyIcon size={16} className="text-brand-secondary-text-icons" />
        </Container>
        <OnboardingInfo />
      </Container>
    </Container>
  );
};
