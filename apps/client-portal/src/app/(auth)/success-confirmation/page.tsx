import { SuccessConfirmationScreen } from "@/features/auth/screens/success-confirmation.screen";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "You're All Set | Resonance Client Portal",
};

function SuccessConfirmation() {
  return <SuccessConfirmationScreen />;
}

export default SuccessConfirmation;
