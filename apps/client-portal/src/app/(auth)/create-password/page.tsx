import { CreatePasswordScreen } from "@/features/auth/screens/create-password.screen";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Password | Resonance Client Portal",
};

function CreatePassword() {
  return (
    <Suspense>
      <CreatePasswordScreen />
    </Suspense>
  );
}

export default CreatePassword;
