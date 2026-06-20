import { Button, Container, Text } from "@resonance/ui";
import { OnboardingReferenceWrapper } from "./onboarding-reference";
import { BackIcon, ChevronRightIcon, WarningIcon } from "@resonance/ui/icons";

export const OnboardingAttention = () => {
  return (
    <Container>
      <Container className="flex flex-col items-center justify-center">
        <WarningIcon className="text-warning-text-icons" size={120} />
        <Text variant="h3" className="text-primary text-center mb-2 mt-12">
          Your application has been submitted!
        </Text>
      </Container>

      <Container className="mb-9 mt-4">
        <Text className="text-primary text-center" variant="bodyXSmall">
          Your proof of right to work document could not be verified.
        </Text>
      </Container>
      <OnboardingReferenceWrapper />
      <Container className="mt-8">
        <Button
          leftIcon={<BackIcon className="text-inverted" />}
          variant="warning"
          className="w-full"
        >
          Attend to the issue
        </Button>
      </Container>
    </Container>
  );
};
