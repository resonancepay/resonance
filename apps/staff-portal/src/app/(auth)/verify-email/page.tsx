import { VerifyEmailScreen } from "@/features/auth/screens/verify-email.screen";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify Email | Resonance Staff Portal",
};

function VerifyEmail() {
  return (
    <Suspense>
      <VerifyEmailScreen />
    </Suspense>
  );
}

export default VerifyEmail;
