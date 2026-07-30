import { RegisterScreen } from "@/features/auth/screens/register.screen";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create Account | Resonance Client Portal",
};

function Register() {
  return <RegisterScreen />;
}

export default Register;
