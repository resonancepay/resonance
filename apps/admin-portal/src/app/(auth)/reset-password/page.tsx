import { ResetPasswordScreen } from "@/features/auth/screens/reset-password.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Resonance Admin Portal",
};

function ResetPassword() {
  return <ResetPasswordScreen />;
}

export default ResetPassword;
