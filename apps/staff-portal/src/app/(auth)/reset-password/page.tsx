import { ResetPasswordScreen } from "@/features/auth/screens/reset-password.screen";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Reset Password | Resonance Staff Portal",
};

function ResetPassword() {
  return <ResetPasswordScreen />;
}

export default ResetPassword;
