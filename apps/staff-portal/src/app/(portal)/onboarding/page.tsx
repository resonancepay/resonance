import { OnboardingScreen } from "@/features/onboarding/screens/onboarding.screen";
import { Container } from "@resonance/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Your Profile | Resonance Staff Portal",
};

function Onboarding() {
  return <OnboardingScreen />;
}

export default Onboarding;
