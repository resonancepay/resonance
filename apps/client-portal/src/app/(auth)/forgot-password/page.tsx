import { ForgotPasswordScreen } from "@/features/auth/screens/forgot-password.screen";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Recover Account | Resonance Client Portal",
};

function ForgotPassword() {
  return <ForgotPasswordScreen />;
}

export default ForgotPassword;
