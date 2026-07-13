import { ResetSuccessScreen } from "@/features/auth/screens/reset-success.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Reset Successful | Resonance Admin Portal",
};

function ResetSuccess() {
  return <ResetSuccessScreen />;
}

export default ResetSuccess;
