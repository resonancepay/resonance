import { CleanerEarningScreen } from "@/features/financials/screens/cleaner-earning.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cleaner Earning | Resonance Admin Portal",
};

function CleanerEarning() {
  return <CleanerEarningScreen />;
}

export default CleanerEarning;
