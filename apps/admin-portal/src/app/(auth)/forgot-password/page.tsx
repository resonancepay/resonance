import { ForgotPasswordScreen } from "@/features/auth/screens/forgot-password.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Resonance Admin Portal",
};

function ForgotPassword() {
  return <ForgotPasswordScreen />;
}

export default ForgotPassword;
