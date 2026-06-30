import { RegistrationSuccessScreen } from "@/features/auth/screens/registration-success.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Successful | Resonance Staff Portal",
};

function SuccessPage() {
  return <RegistrationSuccessScreen />;
}

export default SuccessPage;
