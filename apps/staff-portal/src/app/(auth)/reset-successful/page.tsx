import ResetSuccessScreen from "@/features/auth/screens/reset-success.screen";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Password Reset Successful | Resonance Staff Portal",
};

function ResetSuccessful() {
  return <ResetSuccessScreen />;
}

export default ResetSuccessful;
