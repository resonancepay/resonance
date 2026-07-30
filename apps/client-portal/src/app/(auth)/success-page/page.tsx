import { RegistrationSuccessScreen } from "@/features/auth/screens/registration-success.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Successful | Resonance Client Portal",
};

function SuccessPage() {
  return <RegistrationSuccessScreen />;
}

export default SuccessPage;
