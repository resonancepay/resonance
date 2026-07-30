import { RecoverAccountScreen } from "@/features/auth/screens/recover-account.screen";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Recover Account | Resonance Client Portal",
};

function RecoverAccount() {
  return <RecoverAccountScreen />;
}

export default RecoverAccount;
