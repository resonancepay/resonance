import { Container, Text } from "@resonance/ui";
import Image from "next/image";
import React from "react";
import { OnboardingReferenceWrapper } from "./onboarding-reference";
import { useAuthStore } from "@/shared/store/auth.store";

export const OnboardingSubmitted = ({
  referenceCode,
}: {
  referenceCode: string;
}) => {
  const { user } = useAuthStore();
  return (
    <Container>
      <Text variant="h4" className="text-primary text-center mb-2">
        Your application has been submitted!
      </Text>
      <Container className="flex items-center justify-center">
        <Image
          width={160}
          height={160}
          src="assets/svgs/message-sent.svg"
          alt=""
        />
      </Container>
      <Container className="mb-9">
        <Text className="text-primary mb-3 text-center" variant="bodyXSmall">
          Hi, {user?.userInfo?.first_name},
        </Text>
        <Text className="text-primary text-center" variant="bodyXSmall">
          Your application has been received successfully. We will be in touch
          shortly to discuss next steps.
        </Text>
      </Container>
      <OnboardingReferenceWrapper referenceCode={referenceCode} />
    </Container>
  );
};
