import { ApprovedCleanersScreen } from "@/features/cleaners/screens/approved-cleaners.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Approved Cleaners | Resonance Admin Portal",
};

function ApprovedCleaners() {
  return <ApprovedCleanersScreen />;
}

export default ApprovedCleaners;
